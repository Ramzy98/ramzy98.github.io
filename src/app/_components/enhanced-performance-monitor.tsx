'use client';

import { useEffect, useRef } from 'react';
import { useAnalyticsContext } from './analytics-provider';

interface PerformanceEntryWithId extends PerformanceEntry {
  id?: string;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
  id?: string;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export default function EnhancedPerformanceMonitor() {
  const { trackPerformance, trackEvent } = useAnalyticsContext();
  const isTrackingEnabled = process.env.NODE_ENV === 'production';
  const performanceDataRef = useRef<{
    lcp: number;
    fid: number;
    cls: number;
    fcp: number;
    ttfb: number;
    memory?: any;
  }>({
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
    ttfb: 0,
  });

  useEffect(() => {
    if (!isTrackingEnabled || typeof window === 'undefined') {
      return;
    }

    // Enhanced Core Web Vitals tracking
    const trackWebVitals = () => {
      // Track Largest Contentful Paint (LCP)
      const trackLCP = () => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntryWithId;
          if (lastEntry) {
            const lcpValue = Math.round(lastEntry.startTime);
            performanceDataRef.current.lcp = lcpValue;
            
            trackPerformance({
              largestContentfulPaint: lcpValue,
              metric_name: 'LCP',
              metric_id: lastEntry.id || `lcp-${Date.now()}`,
            });

            // Track LCP performance category
            let lcpCategory = 'good';
            if (lcpValue > 4000) lcpCategory = 'poor';
            else if (lcpValue > 2500) lcpCategory = 'needs_improvement';

            trackEvent({
              event: 'web_vital_performance',
              metric: 'LCP',
              value: lcpValue,
              category: lcpCategory,
              timestamp: Date.now(),
            });
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      };

      // Track First Input Delay (FID)
      const trackFID = () => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fidEntry = entry as FirstInputEntry;
            const fidValue = Math.round(fidEntry.processingStart - fidEntry.startTime);
            performanceDataRef.current.fid = fidValue;
            
            trackPerformance({
              firstInputDelay: fidValue,
              metric_name: 'FID',
              metric_id: fidEntry.id || `fid-${Date.now()}`,
            });

            // Track FID performance category
            let fidCategory = 'good';
            if (fidValue > 300) fidCategory = 'poor';
            else if (fidValue > 100) fidCategory = 'needs_improvement';

            trackEvent({
              event: 'web_vital_performance',
              metric: 'FID',
              value: fidValue,
              category: fidCategory,
              timestamp: Date.now(),
            });
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      };

      // Track Cumulative Layout Shift (CLS)
      const trackCLS = () => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const layoutEntry = entry as LayoutShiftEntry;
            if (!layoutEntry.hadRecentInput) {
              clsValue += layoutEntry.value;
            }
          });
        });
        observer.observe({ entryTypes: ['layout-shift'] });

        // Report CLS when page is hidden
        const reportCLS = () => {
          if (clsValue > 0) {
            const clsValueRounded = Math.round(clsValue * 1000) / 1000;
            performanceDataRef.current.cls = clsValueRounded;
            
            trackPerformance({
              cumulativeLayoutShift: clsValueRounded,
              metric_name: 'CLS',
              metric_id: 'cls-' + Date.now(),
            });

            // Track CLS performance category
            let clsCategory = 'good';
            if (clsValueRounded > 0.25) clsCategory = 'poor';
            else if (clsValueRounded > 0.1) clsCategory = 'needs_improvement';

            trackEvent({
              event: 'web_vital_performance',
              metric: 'CLS',
              value: clsValueRounded,
              category: clsCategory,
              timestamp: Date.now(),
            });
          }
        };

        document.addEventListener('visibilitychange', reportCLS);
        window.addEventListener('beforeunload', reportCLS);
      };

      // Track First Contentful Paint (FCP)
      const trackFCP = () => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstEntry = entries[0] as PerformanceEntryWithId;
          if (firstEntry) {
            const fcpValue = Math.round(firstEntry.startTime);
            performanceDataRef.current.fcp = fcpValue;
            
            trackPerformance({
              firstContentfulPaint: fcpValue,
              metric_name: 'FCP',
              metric_id: firstEntry.id || `fcp-${Date.now()}`,
            });

            // Track FCP performance category
            let fcpCategory = 'good';
            if (fcpValue > 3000) fcpCategory = 'poor';
            else if (fcpValue > 1800) fcpCategory = 'needs_improvement';

            trackEvent({
              event: 'web_vital_performance',
              metric: 'FCP',
              value: fcpValue,
              category: fcpCategory,
              timestamp: Date.now(),
            });
          }
        });
        observer.observe({ entryTypes: ['first-contentful-paint'] });
      };

      // Track Time to First Byte (TTFB)
      const trackTTFB = () => {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          const ttfbValue = Math.round(navigationEntry.responseStart - navigationEntry.requestStart);
          performanceDataRef.current.ttfb = ttfbValue;
          
          trackPerformance({
            timeToFirstByte: ttfbValue,
            metric_name: 'TTFB',
            metric_id: 'ttfb-' + Date.now(),
          });

          // Track TTFB performance category
          let ttfbCategory = 'good';
          if (ttfbValue > 1800) ttfbCategory = 'poor';
          else if (ttfbValue > 600) ttfbCategory = 'needs_improvement';

          trackEvent({
            event: 'web_vital_performance',
            metric: 'TTFB',
            value: ttfbValue,
            category: ttfbCategory,
            timestamp: Date.now(),
          });
        }
      };

      // Initialize all trackers
      trackLCP();
      trackFID();
      trackCLS();
      trackFCP();
      trackTTFB();
    };

    // Enhanced page load tracking
    const trackPageLoad = () => {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigationEntry) {
          const pageLoadMetrics = {
            pageLoadTime: Math.round(loadTime),
            domContentLoaded: Math.round(navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart),
            domInteractive: Math.round(navigationEntry.domInteractive - navigationEntry.fetchStart),
            loadComplete: Math.round(navigationEntry.loadEventEnd - navigationEntry.fetchStart),
            url: window.location.href,
            userAgent: navigator.userAgent,
            connectionType: getConnectionType(),
          };

          trackPerformance(pageLoadMetrics);

          // Track overall page performance score
          const performanceScore = calculatePerformanceScore();
          trackEvent({
            event: 'page_performance_score',
            score: performanceScore,
            metrics: performanceDataRef.current,
            timestamp: Date.now(),
          });
        }
      });
    };

    // Enhanced memory tracking
    const trackMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryData = {
          usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
          jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
          memoryUsagePercentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100),
        };

        performanceDataRef.current.memory = memoryData;
        trackPerformance(memoryData);

        // Track memory warnings
        if (memoryData.memoryUsagePercentage > 80) {
          trackEvent({
            event: 'memory_warning',
            usage_percentage: memoryData.memoryUsagePercentage,
            used_memory_mb: memoryData.usedJSHeapSize,
            timestamp: Date.now(),
          });
        }
      }
    };

    // Track resource loading performance
    const trackResourcePerformance = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.initiatorType === 'img' || resourceEntry.initiatorType === 'script' || resourceEntry.initiatorType === 'css') {
            trackEvent({
              event: 'resource_load_performance',
              resource_type: resourceEntry.initiatorType,
              resource_name: resourceEntry.name,
              load_time: Math.round(resourceEntry.duration),
              size: resourceEntry.transferSize || 0,
              timestamp: Date.now(),
            });
          }
        });
      });
      observer.observe({ entryTypes: ['resource'] });
    };

    // Calculate overall performance score
    const calculatePerformanceScore = () => {
      const { lcp, fid, cls, fcp, ttfb } = performanceDataRef.current;
      let score = 100;

      // Deduct points for poor performance
      if (lcp > 4000) score -= 25;
      else if (lcp > 2500) score -= 10;

      if (fid > 300) score -= 25;
      else if (fid > 100) score -= 10;

      if (cls > 0.25) score -= 25;
      else if (cls > 0.1) score -= 10;

      if (fcp > 3000) score -= 15;
      else if (fcp > 1800) score -= 5;

      if (ttfb > 1800) score -= 10;
      else if (ttfb > 600) score -= 5;

      return Math.max(0, score);
    };

    // Initialize tracking
    trackWebVitals();
    trackPageLoad();
    trackMemory();
    trackResourcePerformance();

    // Track memory usage periodically
    const memoryInterval = setInterval(trackMemory, 30000); // Every 30 seconds

    // Track performance summary every 5 minutes
    const performanceSummaryInterval = setInterval(() => {
      const summary = {
        event: 'performance_summary',
        metrics: performanceDataRef.current,
        performance_score: calculatePerformanceScore(),
        timestamp: Date.now(),
      };
      trackEvent(summary);
    }, 300000); // Every 5 minutes

    return () => {
      clearInterval(memoryInterval);
      clearInterval(performanceSummaryInterval);
    };
  }, [isTrackingEnabled, trackPerformance, trackEvent]);

  return null; // This component doesn't render anything
}

// Helper function
function getConnectionType(): string {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection?.effectiveType || connection?.type || 'unknown';
  }
  return 'unknown';
} 