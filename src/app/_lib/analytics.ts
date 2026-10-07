import { sendGAEvent } from '@next/third-parties/google';

/**
 * The handful of events worth knowing about on a portfolio. Kept deliberately
 * small: no device fingerprinting, no per-keystroke form tracking.
 */
type AnalyticsEvent =
  | 'resume_open'
  | 'resume_download'
  | 'social_click'
  | 'project_link_click'
  | 'contact_submit'
  | 'contact_error'
  | 'command_palette_open'
  | 'fit_check';

const isEnabled = process.env.NODE_ENV === 'production' && Boolean(process.env.NEXT_PUBLIC_GA_ID);

export function track(event: AnalyticsEvent, params: Record<string, string | number> = {}) {
  if (!isEnabled) return;
  sendGAEvent('event', event, params);
}
