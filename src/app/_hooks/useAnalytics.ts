'use client';

import { useEffect, useCallback, useRef } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';

interface AnalyticsEvent {
  event: string;
  [key: string]: any;
}

interface UserBehavior {
  timeOnPage: number;
  scrollDepth: number;
  interactions: number;
  lastActivity: number;
}

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToFirstByte: number;
}

export const useAnalytics = () => {
  const userBehaviorRef = useRef<UserBehavior>({
    timeOnPage: 0,
    scrollDepth: 0,
    interactions: 0,
    lastActivity: Date.now(),
  });

  const sessionStartTime = useRef<number>(Date.now());
  const isTrackingEnabled = process.env.NODE_ENV === 'production';

  // Enhanced event tracking with better categorization
  const trackEvent = useCallback((eventData: AnalyticsEvent) => {
    if (!isTrackingEnabled) return;

    const enhancedEvent = {
      ...eventData,
      timestamp: Date.now(),
      session_duration: Date.now() - sessionStartTime.current,
      user_behavior: userBehaviorRef.current,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    };

    sendGTMEvent(enhancedEvent);
  }, [isTrackingEnabled]);

  // Track user engagement metrics
  const trackEngagement = useCallback(() => {
    if (!isTrackingEnabled) return;

    const now = Date.now();
    const timeSinceLastActivity = now - userBehaviorRef.current.lastActivity;
    
    // Track engagement every 30 seconds of inactivity
    if (timeSinceLastActivity >= 30000) {
      trackEvent({
        event: 'user_engagement',
        engagement_time_msec: Math.min(timeSinceLastActivity, 30000),
        session_engaged: 1,
        time_on_page: userBehaviorRef.current.timeOnPage,
        scroll_depth: userBehaviorRef.current.scrollDepth,
        total_interactions: userBehaviorRef.current.interactions,
      });
    }
  }, [isTrackingEnabled, trackEvent]);

  // Track scroll depth with more granularity
  const trackScrollDepth = useCallback(() => {
    if (!isTrackingEnabled) return;

    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    // Track scroll depth at 25%, 50%, 75%, and 100%
    const scrollMilestones = [25, 50, 75, 100];
    const currentMilestone = scrollMilestones.find(milestone => scrollPercent >= milestone);

    if (currentMilestone && currentMilestone > userBehaviorRef.current.scrollDepth) {
      userBehaviorRef.current.scrollDepth = currentMilestone;
      trackEvent({
        event: 'scroll_depth',
        scroll_percentage: currentMilestone,
        scroll_position: scrollTop,
        document_height: docHeight,
      });
    }
  }, [isTrackingEnabled, trackEvent]);

  // Track user interactions
  const trackInteraction = useCallback((interactionType: string, details?: any) => {
    if (!isTrackingEnabled) return;

    userBehaviorRef.current.interactions++;
    userBehaviorRef.current.lastActivity = Date.now();

    trackEvent({
      event: 'user_interaction',
      interaction_type: interactionType,
      total_interactions: userBehaviorRef.current.interactions,
      ...details,
    });
  }, [isTrackingEnabled, trackEvent]);

  // Track page performance metrics
  const trackPerformance = useCallback((metrics: Partial<PerformanceMetrics>) => {
    if (!isTrackingEnabled) return;

    trackEvent({
      event: 'performance_metrics',
      ...metrics,
    });
  }, [isTrackingEnabled, trackEvent]);

  // Track conversion goals
  const trackConversion = useCallback((goal: string, value?: number) => {
    if (!isTrackingEnabled) return;

    trackEvent({
      event: 'conversion',
      goal_name: goal,
      goal_value: value || 1,
      session_duration: Date.now() - sessionStartTime.current,
    });
  }, [isTrackingEnabled, trackEvent]);

  // Track user journey
  const trackUserJourney = useCallback((action: string, section?: string) => {
    if (!isTrackingEnabled) return;

    trackEvent({
      event: 'user_journey',
      action,
      section,
      journey_step: action,
      time_on_page: userBehaviorRef.current.timeOnPage,
    });
  }, [isTrackingEnabled, trackEvent]);

  // Enhanced error tracking
  const trackError = useCallback((error: Error, context?: string) => {
    if (!isTrackingEnabled) return;

    trackEvent({
      event: 'error',
      error_message: error.message,
      error_stack: error.stack,
      error_context: context,
      page_url: window.location.href,
    });
  }, [isTrackingEnabled, trackEvent]);

  // Track device and browser information
  const trackDeviceInfo = useCallback(() => {
    if (!isTrackingEnabled) return;

    const deviceInfo = {
      event: 'device_info',
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
      browser: getBrowserInfo(),
      os: getOSInfo(),
      connection_type: getConnectionType(),
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    trackEvent(deviceInfo);
  }, [isTrackingEnabled, trackEvent]);

  // Initialize analytics tracking
  useEffect(() => {
    if (!isTrackingEnabled) return;

    // Track page view with enhanced data
    trackEvent({
      event: 'page_view',
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: document.referrer,
    });

    // Track device info on first load
    trackDeviceInfo();

    // Set up scroll tracking
    const handleScroll = () => {
      trackScrollDepth();
    };

    // Set up engagement tracking
    const handleUserActivity = () => {
      userBehaviorRef.current.lastActivity = Date.now();
    };

    // Set up performance tracking
    const trackPagePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          trackPerformance({
            pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            timeToFirstByte: navigation.responseStart - navigation.requestStart,
          });
        }
      }
    };

    // Track time on page
    const timeTrackingInterval = setInterval(() => {
      userBehaviorRef.current.timeOnPage += 1;
      trackEngagement();
    }, 1000);

    // Track engagement every 30 seconds
    const engagementInterval = setInterval(trackEngagement, 30000);

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);
    window.addEventListener('load', trackPagePerformance);

    // Track before unload
    const handleBeforeUnload = () => {
      trackEvent({
        event: 'page_exit',
        time_on_page: userBehaviorRef.current.timeOnPage,
        scroll_depth: userBehaviorRef.current.scrollDepth,
        total_interactions: userBehaviorRef.current.interactions,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      clearInterval(timeTrackingInterval);
      clearInterval(engagementInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('load', trackPagePerformance);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isTrackingEnabled, trackEvent, trackScrollDepth, trackEngagement, trackDeviceInfo, trackPerformance]);

  return {
    trackEvent,
    trackInteraction,
    trackPerformance,
    trackConversion,
    trackUserJourney,
    trackError,
    trackDeviceInfo,
  };
};

// Helper functions
function getBrowserInfo(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Unknown';
}

function getOSInfo(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
}

function getConnectionType(): string {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection?.effectiveType || connection?.type || 'unknown';
  }
  return 'unknown';
} 