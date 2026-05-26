import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

/**
 * Initialize error tracking with Sentry
 * Captures exceptions, logs, and performance metrics
 */
export const initializeErrorTracking = () => {
  const dsn = process.env.REACT_APP_SENTRY_DSN;
  const env = process.env.REACT_APP_ENV;

  // Only initialize in production or when DSN is provided
  if (!dsn) {
    console.log('Sentry DSN not configured, error tracking disabled');
    return;
  }

  Sentry.init({
    dsn: dsn,
    environment: env,
    tracesSampleRate: env === 'production' ? 0.1 : 1.0,
    integrations: [
      new BrowserTracing(),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    // Attach stack traces to all messages
    attachStacktrace: true,
    // Set 'debug' to true during development
    debug: env === 'development',
    // Performance monitoring
    beforeSend(event, hint) {
      // Filter out certain errors if needed
      if (event.transaction === 'GET /health') {
        return null; // Don't send health check errors
      }
      return event;
    },
  });

  console.log(`✅ Sentry initialized for ${env} environment`);
};

/**
 * Capture custom exceptions
 * Usage: captureException(error, { tags: { component: 'LoginPage' } })
 */
export const captureException = (error, context = {}) => {
  Sentry.captureException(error, {
    tags: context.tags || {},
    extra: context.extra || {},
  });
};

/**
 * Capture custom messages
 * Usage: captureMessage('User action completed', 'info')
 */
export const captureMessage = (message, level = 'info') => {
  Sentry.captureMessage(message, level);
};

/**
 * Add user context to error reports
 * Usage: setSentryUser({ id: '123', email: 'user@example.com' })
 */
export const setSentryUser = (user) => {
  if (user) {
    Sentry.setUser({
      id: user.userid,
      email: user.emailid,
      username: user.emailid,
    });
  } else {
    Sentry.setUser(null);
  }
};

/**
 * Add breadcrumb for debugging user actions
 * Usage: addBreadcrumb('User navigated to dashboard')
 */
export const addBreadcrumb = (message, data = {}) => {
  Sentry.addBreadcrumb({
    message: message,
    level: 'info',
    data: data,
  });
};
