'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAnalytics } from '../_hooks/useAnalytics';

interface AnalyticsContextType {
  trackEvent: (eventData: any) => void;
  trackInteraction: (interactionType: string, details?: any) => void;
  trackPerformance: (metrics: any) => void;
  trackConversion: (goal: string, value?: number) => void;
  trackUserJourney: (action: string, section?: string) => void;
  trackError: (error: Error, context?: string) => void;
  trackDeviceInfo: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const analytics = useAnalytics();

  // Global error boundary for analytics
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      analytics.trackError(new Error(event.message), 'global_error');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      analytics.trackError(new Error(event.reason), 'unhandled_promise_rejection');
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [analytics]);

  // Track route changes for SPA navigation
  useEffect(() => {
    const handleRouteChange = () => {
      analytics.trackEvent({
        event: 'route_change',
        new_url: window.location.href,
        previous_url: document.referrer,
      });
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [analytics]);

  // Track visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        analytics.trackEvent({
          event: 'page_hidden',
          timestamp: Date.now(),
        });
      } else {
        analytics.trackEvent({
          event: 'page_visible',
          timestamp: Date.now(),
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [analytics]);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      analytics.trackEvent({
        event: 'connection_status',
        status: 'online',
        timestamp: Date.now(),
      });
    };

    const handleOffline = () => {
      analytics.trackEvent({
        event: 'connection_status',
        status: 'offline',
        timestamp: Date.now(),
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [analytics]);

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
} 