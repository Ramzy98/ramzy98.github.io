/**
 * Analytics Configuration for Portfolio Website
 * 
 * This file documents all analytics events, their purposes, and data structures
 * to ensure consistent tracking across the application.
 */

export interface AnalyticsEvent {
  event: string;
  [key: string]: any;
}

// Event Categories
export const EVENT_CATEGORIES = {
  USER_INTERACTION: 'user_interaction',
  PERFORMANCE: 'performance',
  CONVERSION: 'conversion',
  USER_JOURNEY: 'user_journey',
  ERROR: 'error',
  DEVICE_INFO: 'device_info',
  WEB_VITALS: 'web_vitals',
  PAGE_VIEW: 'page_view',
  NAVIGATION: 'navigation',
  FORM_INTERACTION: 'form_interaction',
  SOCIAL_ENGAGEMENT: 'social_engagement',
  PROJECT_ENGAGEMENT: 'project_engagement',
} as const;

// Event Names
export const EVENT_NAMES = {
  // User Interactions
  CLICK: 'click',
  HOVER: 'hover',
  SCROLL: 'scroll',
  FORM_FOCUS: 'form_field_focus',
  FORM_CHANGE: 'form_field_change',
  FORM_SUBMIT: 'form_submit',
  FORM_SUBMIT_ATTEMPT: 'form_submit_attempt',
  
  // Navigation
  NAVIGATION_CLICK: 'navigation_click',
  SECTION_VIEW: 'section_view',
  MOBILE_MENU_TOGGLE: 'mobile_menu_toggle',
  ROUTE_CHANGE: 'route_change',
  
  // Social & Project Engagement
  SOCIAL_LINK_CLICK: 'social_link_click',
  PROJECT_LINK_CLICK: 'project_link_click',
  PROJECT_CARD_HOVER: 'project_card_hover',
  RESUME_VIEW: 'resume_view',
  
  // Performance
  WEB_VITAL_PERFORMANCE: 'web_vital_performance',
  PERFORMANCE_METRICS: 'performance_metrics',
  PAGE_PERFORMANCE_SCORE: 'page_performance_score',
  PERFORMANCE_SUMMARY: 'performance_summary',
  MEMORY_WARNING: 'memory_warning',
  RESOURCE_LOAD_PERFORMANCE: 'resource_load_performance',
  
  // User Journey
  USER_JOURNEY: 'user_journey',
  USER_ENGAGEMENT: 'user_engagement',
  SCROLL_DEPTH: 'scroll_depth',
  PAGE_EXIT: 'page_exit',
  PAGE_HIDDEN: 'page_hidden',
  PAGE_VISIBLE: 'page_visible',
  
  // Conversions
  CONVERSION: 'conversion',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  LINKEDIN_CLICK: 'linkedin_click',
  PROJECT_DEMO_VIEW: 'project_demo_view',
  
  // Errors
  ERROR: 'error',
  GLOBAL_ERROR: 'global_error',
  UNHANDLED_PROMISE_REJECTION: 'unhandled_promise_rejection',
  
  // Device & Connection
  DEVICE_INFO: 'device_info',
  CONNECTION_STATUS: 'connection_status',
} as const;

// Section Names
export const SECTIONS = {
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  CONTACT: 'contact',
} as const;

// Social Platforms
export const SOCIAL_PLATFORMS = {
  GITHUB: 'FaGithub',
  LINKEDIN: 'FaLinkedin',
  MEDIUM: 'FaMedium',
  TWITTER: 'FaXTwitter',
  EMAIL: 'SiGmail',
} as const;

// Performance Categories
export const PERFORMANCE_CATEGORIES = {
  GOOD: 'good',
  NEEDS_IMPROVEMENT: 'needs_improvement',
  POOR: 'poor',
} as const;

// Device Types
export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  TABLET: 'tablet',
} as const;

// Navigation Types
export const NAVIGATION_TYPES = {
  CLICK: 'click',
  SCROLL: 'scroll',
  PROGRAMMATIC: 'programmatic',
} as const;

// Form Field Types
export const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  MESSAGE: 'message',
} as const;

// Project Link Types
export const PROJECT_LINK_TYPES = {
  GITHUB: 'github',
  LIVE_DEMO: 'live_demo',
} as const;

// Error Contexts
export const ERROR_CONTEXTS = {
  CONTACT_FORM: 'contact_form',
  CONTACT_FORM_NETWORK: 'contact_form_network',
  GLOBAL_ERROR: 'global_error',
  UNHANDLED_PROMISE_REJECTION: 'unhandled_promise_rejection',
} as const;

// Conversion Goals
export const CONVERSION_GOALS = {
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  LINKEDIN_CLICK: 'linkedin_click',
  RESUME_VIEW: 'resume_view',
  PROJECT_DEMO_VIEW: 'project_demo_view',
} as const;

// Analytics Event Templates
export const ANALYTICS_TEMPLATES = {
  // User Interaction Template
  USER_INTERACTION: (interactionType: string, details?: any): AnalyticsEvent => ({
    event: EVENT_NAMES.CLICK,
    interaction_type: interactionType,
    timestamp: Date.now(),
    ...details,
  }),

  // Performance Template
  PERFORMANCE: (metrics: any): AnalyticsEvent => ({
    event: EVENT_NAMES.PERFORMANCE_METRICS,
    timestamp: Date.now(),
    ...metrics,
  }),

  // Conversion Template
  CONVERSION: (goal: string, value: number = 1): AnalyticsEvent => ({
    event: EVENT_NAMES.CONVERSION,
    goal_name: goal,
    goal_value: value,
    timestamp: Date.now(),
  }),

  // User Journey Template
  USER_JOURNEY: (action: string, section?: string): AnalyticsEvent => ({
    event: EVENT_NAMES.USER_JOURNEY,
    action,
    section,
    journey_step: action,
    timestamp: Date.now(),
  }),

  // Error Template
  ERROR: (error: Error, context?: string): AnalyticsEvent => ({
    event: EVENT_NAMES.ERROR,
    error_message: error.message,
    error_stack: error.stack,
    error_context: context,
    timestamp: Date.now(),
  }),
} as const;

// Performance Thresholds
export const PERFORMANCE_THRESHOLDS = {
  LCP: {
    GOOD: 2500,
    POOR: 4000,
  },
  FID: {
    GOOD: 100,
    POOR: 300,
  },
  CLS: {
    GOOD: 0.1,
    POOR: 0.25,
  },
  FCP: {
    GOOD: 1800,
    POOR: 3000,
  },
  TTFB: {
    GOOD: 600,
    POOR: 1800,
  },
} as const;

// Scroll Depth Milestones
export const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

// Memory Warning Threshold
export const MEMORY_WARNING_THRESHOLD = 80; // percentage

// Tracking Intervals
export const TRACKING_INTERVALS = {
  MEMORY_CHECK: 30000, // 30 seconds
  PERFORMANCE_SUMMARY: 300000, // 5 minutes
  ENGAGEMENT_CHECK: 30000, // 30 seconds
} as const;

// Enhanced Event Data Structure
export interface EnhancedEventData {
  // Basic event info
  event: string;
  timestamp: number;
  
  // User behavior context
  session_duration?: number;
  time_on_page?: number;
  scroll_depth?: number;
  total_interactions?: number;
  
  // Page context
  page_url?: string;
  page_title?: string;
  page_referrer?: string;
  
  // Device context
  user_agent?: string;
  screen_resolution?: string;
  viewport_size?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  connection_type?: string;
  language?: string;
  timezone?: string;
  
  // Custom event data
  [key: string]: any;
}

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  // Enable/disable tracking based on environment
  ENABLED: process.env.NODE_ENV === 'production',
  
  // Sampling rate for high-frequency events (0-1)
  SAMPLING_RATE: 1.0,
  
  // Maximum events per session to prevent spam
  MAX_EVENTS_PER_SESSION: 1000,
  
  // Batch size for sending events
  BATCH_SIZE: 10,
  
  // Retry configuration for failed events
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  
  // Privacy settings
  RESPECT_DNT: true, // Respect Do Not Track
  ANONYMIZE_IP: true,
  
  // Performance monitoring settings
  PERFORMANCE_MONITORING: {
    ENABLED: true,
    CORE_WEB_VITALS: true,
    MEMORY_MONITORING: true,
    RESOURCE_MONITORING: true,
  },
  
  // User behavior tracking settings
  USER_BEHAVIOR_TRACKING: {
    ENABLED: true,
    SCROLL_DEPTH: true,
    TIME_ON_PAGE: true,
    CLICK_TRACKING: true,
    FORM_INTERACTION: true,
  },
  
  // Error tracking settings
  ERROR_TRACKING: {
    ENABLED: true,
    GLOBAL_ERRORS: true,
    UNHANDLED_REJECTIONS: true,
    NETWORK_ERRORS: true,
  },
} as const;

export default ANALYTICS_CONFIG; 