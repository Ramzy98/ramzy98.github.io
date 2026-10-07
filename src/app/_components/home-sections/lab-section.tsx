'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  FaBolt,
  FaBuildingColumns,
  FaCartShopping,
  FaForwardFast,
  FaPlay,
  FaRotateLeft,
  FaShuffle,
} from 'react-icons/fa6';
import { SiFastify, SiPostgresql, SiRedis } from 'react-icons/si';
import { party } from '@/app/_lib/party';
import { RevealHeading, RevealWords } from '../scroll/reveal-text';
import { ScrambleText } from '../scroll/scramble-text';

type NodeId = 'checkout' | 'api' | 'router' | 'psp' | 'webhook' | 'redis' | 'ledger';

const NODES: { id: NodeId; label: string; detail: string; Icon: IconType }[] = [
  { id: 'checkout', label: 'Checkout', detail: 'Customer pays', Icon: FaCartShopping },
  { id: 'api', label: 'Payments API', detail: 'Fastify', Icon: SiFastify },
  { id: 'router', label: 'PSP router', detail: '8 providers', Icon: FaShuffle },
  { id: 'psp', label: 'Provider', detail: 'Charges the card', Icon: FaBuildingColumns },
  { id: 'webhook', label: 'Webhook', detail: 'Retry + backoff', Icon: FaBolt },
  { id: 'redis', label: 'Dedupe', detail: 'Redis SET NX', Icon: SiRedis },
  { id: 'ledger', label: 'Ledger', detail: 'PostgreSQL', Icon: SiPostgresql },
];

const PROVIDERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const STEP_MS = 420;
const FAST_STEP_MS = 30;
const BURST_SIZE = 25;
const MAX_LOG_LINES = 80;

type Level = 'info' | 'ok' | 'warn';
interface LogLine {
  id: number;
  time: string;
  level: Level;
  text: string;
}
interface Stats {
  sent: number;
  settled: number;
  retries: number;
  duplicates: number;
}
interface Chaos {
  flaky: boolean;
  duplicate: boolean;
}

const EMPTY_STATS: Stats = { sent: 0, settled: 0, retries: 0, duplicates: 0 };
const hex = () => Math.random().toString(16).slice(2, 6);

class Cancelled extends Error {}

/**
 * "Break my payments pipeline": a simplified, playable model of the webhook
 * pipeline from the payments case study. Visitors can make deliveries flaky
 * or duplicated and watch retries and idempotency keep the ledger exact.
 */
export default function LabSection() {
  const [active, setActive] = useState<NodeId | null>(null);
  const [flow, setFlow] = useState<{ index: number; key: number } | null>(null);
  const [provider, setProvider] = useState<number | null>(null);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [chaos, setChaos] = useState<Chaos>({ flaky: false, duplicate: false });
  const [running, setRunning] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const alive = useRef(true);
  const position = useRef(-1);
  const logId = useRef(0);
  const logBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  // Keep the newest log line in view without scrolling the page.
  useEffect(() => {
    const box = logBoxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [logs]);

  const sleep = (ms: number) =>
    new Promise<void>((resolve, reject) =>
      setTimeout(() => (alive.current ? resolve() : reject(new Cancelled())), ms)
    );

  const log = useCallback((level: Level, text: string) => {
    const line = { id: logId.current++, time: new Date().toISOString().slice(11, 23), level, text };
    setLogs((prev) => [...prev.slice(-(MAX_LOG_LINES - 1)), line]);
  }, []);

  /** Moves the "packet" to `node`, animating the connector when it's the next hop. */
  const visit = async (node: NodeId, level: Level, text: string, fast: boolean) => {
    const target = NODES.findIndex((n) => n.id === node);
    if (!fast && target === position.current + 1 && position.current >= 0) {
      setFlow({ index: position.current, key: Date.now() });
      await sleep(STEP_MS * 0.6);
    }
    position.current = target;
    setActive(node);
    log(level, text);
    await sleep(fast ? FAST_STEP_MS : STEP_MS);
  };

  /** One payment end to end. Returns what happened so bursts can summarise. */
  const processPayment = async (opts: Chaos & { fast: boolean }) => {
    const { fast } = opts;
    const payId = `pay_${hex()}`;
    const evtId = `evt_${hex()}`;
    const amount = (Math.random() * 240 + 5).toFixed(2);
    const psp = Math.floor(Math.random() * PROVIDERS.length);
    const name = `PSP-${PROVIDERS[psp]}`;
    position.current = -1;

    await visit('checkout', 'info', `POST /payments  $${amount}  idempotency-key=${payId}`, fast);
    setStats((s) => ({ ...s, sent: s.sent + 1 }));
    await visit('api', 'info', `validated request  ${payId}`, fast);
    setProvider(psp);
    await visit('router', 'info', `routed → ${name}`, fast);
    await visit('psp', 'ok', `${name}  charge.succeeded  ${evtId}`, fast);

    if (opts.flaky) {
      await visit('webhook', 'warn', `deliver ${evtId}  attempt 1 → 503  retrying with backoff`, fast);
      setStats((s) => ({ ...s, retries: s.retries + 1 }));
      await visit('webhook', 'info', `deliver ${evtId}  attempt 2 → 200`, fast);
    } else {
      await visit('webhook', 'info', `deliver ${evtId}  attempt 1 → 200`, fast);
    }

    await visit('redis', 'ok', `SET NX ${evtId} → OK  first time seen`, fast);
    await visit('ledger', 'ok', `INSERT ${payId}  $${amount} → settled ✓`, fast);
    setStats((s) => ({ ...s, settled: s.settled + 1 }));

    if (opts.duplicate) {
      await visit('webhook', 'warn', `${name} re-sent ${evtId}  (duplicate delivery)`, fast);
      await visit('redis', 'warn', `SET NX ${evtId} → exists  ignored, no double charge`, fast);
      setStats((s) => ({ ...s, duplicates: s.duplicates + 1 }));
    }

    return { retried: opts.flaky, duplicated: opts.duplicate };
  };

  const finish = async () => {
    await sleep(STEP_MS);
    setActive(null);
    setFlow(null);
    setRunning(false);
  };

  const sendOne = async () => {
    setRunning(true);
    try {
      await processPayment({ ...chaos, fast: false });
      setAnnouncement('Payment settled.');
      await finish();
    } catch (e) {
      if (!(e instanceof Cancelled)) throw e;
    }
  };

  const sendBurst = async () => {
    setRunning(true);
    setFlow(null);
    log('info', `── burst: ${BURST_SIZE} payments, random chaos on ──`);
    let retries = 0;
    let duplicates = 0;
    try {
      for (let i = 0; i < BURST_SIZE; i++) {
        const result = await processPayment({
          flaky: chaos.flaky || Math.random() < 0.2,
          duplicate: chaos.duplicate || Math.random() < 0.2,
          fast: true,
        });
        if (result.retried) retries++;
        if (result.duplicated) duplicates++;
      }
      log(
        'ok',
        `── burst done: ${BURST_SIZE}/${BURST_SIZE} settled · ${retries} retries recovered · ${duplicates} duplicates blocked · 0 double charges ──`
      );
      setAnnouncement(`Burst complete. ${BURST_SIZE} payments settled, ${duplicates} duplicates blocked, zero double charges.`);
      party();
      await finish();
    } catch (e) {
      if (!(e instanceof Cancelled)) throw e;
    }
  };

  const reset = () => {
    setLogs([]);
    setStats(EMPTY_STATS);
    setProvider(null);
    setAnnouncement('Lab reset.');
  };

  return (
    <section id="lab" aria-labelledby="lab-heading" className="w-full py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <ScrambleText className="section-eyebrow mb-4" text="Lab · Interactive" />
          <RevealHeading
            id="lab-heading"
            lead="Break my"
            accent="payments pipeline"
            className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight"
          />
          <RevealWords
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            segments={[
              { text: 'A playable model of the webhook pipeline from my payments work. Flip the chaos switches and try to' },
              { text: 'lose a transaction', tone: 'bright' },
              { text: 'or' },
              { text: 'charge someone twice.', tone: 'accent' },
            ]}
          />
        </div>

        <div className="glass-panel p-5 sm:p-8">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={sendOne}
                disabled={running}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  stats.sent === 0 && !running ? 'ring-4 ring-accent/30 motion-safe:animate-pulse' : ''
                }`}
              >
                <FaPlay aria-hidden="true" size={12} />
                Send a payment
              </button>
              <button
                type="button"
                onClick={sendBurst}
                disabled={running}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-accent/60 hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaForwardFast aria-hidden="true" size={13} />
                Burst ×{BURST_SIZE}
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={running}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-gray-400 text-sm hover:text-white transition-colors disabled:opacity-50"
              >
                <FaRotateLeft aria-hidden="true" size={12} />
                Reset
              </button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3" role="group" aria-label="Chaos switches">
              <Switch
                label="Flaky webhooks"
                hint="First delivery fails"
                checked={chaos.flaky}
                onChange={(flaky) => setChaos((c) => ({ ...c, flaky }))}
              />
              <Switch
                label="Duplicate deliveries"
                hint="Provider sends twice"
                checked={chaos.duplicate}
                onChange={(duplicate) => setChaos((c) => ({ ...c, duplicate }))}
              />
            </div>
          </div>

          {/* Pipeline */}
          <ol className="flex flex-col lg:flex-row lg:items-stretch mb-8" aria-label="Payment pipeline">
            {NODES.map((node, i) => (
              <li key={node.id} className="contents">
                <PipelineNode
                  node={node}
                  isActive={active === node.id}
                  provider={provider}
                />
                {i < NODES.length - 1 && <Connector flowKey={flow?.index === i ? flow.key : null} />}
              </li>
            ))}
          </ol>

          {/* Log + stats */}
          <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
            <div className="rounded-2xl border border-white/10 bg-black/50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                <span className="font-mono text-xs text-gray-400">payments-service · event log</span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
                  <span className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-emerald-400 motion-safe:animate-pulse' : 'bg-gray-600'}`} />
                  {running ? 'processing' : 'idle'}
                </span>
              </div>
              <div
                ref={logBoxRef}
                role="log"
                aria-label="Event log"
                className="h-56 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed"
              >
                {logs.length === 0 ? (
                  <p className="text-gray-500">$ waiting for a payment… press “Send a payment” to start.</p>
                ) : (
                  logs.map((line) => (
                    <p key={line.id} className="whitespace-pre-wrap break-all">
                      <span className="text-gray-600">{line.time} </span>
                      <span
                        className={
                          line.level === 'ok' ? 'text-emerald-300' : line.level === 'warn' ? 'text-amber-300' : 'text-gray-300'
                        }
                      >
                        {line.text}
                      </span>
                    </p>
                  ))
                )}
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 content-start">
              <Stat label="Payments sent" value={stats.sent} />
              <Stat label="Settled" value={stats.settled} />
              <Stat label="Retries recovered" value={stats.retries} tone="warn" />
              <Stat label="Duplicates blocked" value={stats.duplicates} tone="warn" />
              <div className="col-span-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 flex items-center justify-between">
                <dt className="text-sm text-gray-300">Double charges</dt>
                <dd className="font-mono text-2xl font-bold text-emerald-300">0</dd>
              </div>
            </dl>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {announcement}
          </p>
          <p className="mt-6 text-xs text-gray-500">
            A simplified illustration of the patterns (retries, idempotency keys, an append-only ledger), not
            production code. Provider names are placeholders.
          </p>
        </div>
      </div>
    </section>
  );
}

function PipelineNode({
  node,
  isActive,
  provider,
}: {
  node: (typeof NODES)[number];
  isActive: boolean;
  provider: number | null;
}) {
  const { Icon } = node;
  const detail = node.id === 'psp' && provider !== null ? `PSP-${PROVIDERS[provider]}` : node.detail;

  return (
    <div
      aria-current={isActive ? 'step' : undefined}
      className={`flex lg:flex-col items-center gap-3 lg:gap-2 lg:flex-1 min-w-0 rounded-2xl border px-4 py-2.5 lg:px-2 lg:py-4 lg:text-center transition-all duration-300 ${
        isActive
          ? 'border-accent/70 bg-accent/10 shadow-[0_0_28px_rgba(34,211,238,0.25)] lg:-translate-y-1'
          : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      <Icon aria-hidden="true" className={`text-xl shrink-0 transition-colors ${isActive ? 'text-accent' : 'text-gray-400'}`} />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white truncate">{node.label}</p>
        <p className="text-[11px] text-gray-400 truncate">{detail}</p>
      </div>
      {node.id === 'router' && (
        <div aria-hidden="true" className="ml-auto lg:ml-0 grid grid-cols-4 gap-1">
          {PROVIDERS.map((p, i) => (
            <span
              key={p}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                provider === i ? 'bg-accent shadow-[0_0_6px_rgba(34,211,238,0.9)]' : 'bg-white/15'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Connector({ flowKey }: { flowKey: number | null }) {
  return (
    <div aria-hidden="true" className="relative flex-none self-center h-4 w-px lg:h-px lg:w-5 xl:w-7 bg-white/15">
      {flowKey !== null && (
        <span
          key={flowKey}
          className="absolute left-1/2 top-0 lg:top-1/2 lg:left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(34,211,238,0.9)] motion-safe:animate-flow-y lg:motion-safe:animate-flow-x"
        />
      )}
    </div>
  );
}

function Switch({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-left group"
    >
      <span
        className={`relative w-10 h-6 shrink-0 rounded-full border transition-colors ${
          checked ? 'bg-amber-400/20 border-amber-400/60' : 'bg-white/5 border-white/15'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full transition-all ${
            checked ? 'translate-x-4 bg-amber-300' : 'bg-gray-400'
          }`}
        />
      </span>
      <span>
        <span className="block text-sm font-medium text-white">{label}</span>
        <span className="block text-xs text-gray-400">{hint}</span>
      </span>
    </button>
  );
}

function Stat({ label, value, tone = 'default' }: { label: string; value: number; tone?: 'default' | 'warn' }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <dt className="text-xs text-gray-400">{label}</dt>
      <dd className={`mt-1 font-mono text-2xl font-bold tabular-nums ${tone === 'warn' ? 'text-amber-300' : 'text-white'}`}>
        {value}
      </dd>
    </div>
  );
}
