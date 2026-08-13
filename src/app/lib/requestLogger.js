import { logger } from './logger';

/**
 * Request/Response Logging Middleware
 * Wraps fetch calls with automatic logging
 */

export const logRequest = (method, url) => {
  const startTime = performance.now();
  return {
    startTime,
    method,
    url: stripSensitiveData(url),
  };
};

export const logResponse = (requestLog, response, data = null) => {
  const duration = Math.round(performance.now() - requestLog.startTime);
  
  logger.logRequest(
    requestLog.method,
    requestLog.url,
    response.status,
    duration
  );

  // Log errors or slow requests
  if (response.status >= 400) {
    logger.warn(`API Error: ${requestLog.method} ${requestLog.url}`, {
      status: response.status,
      duration,
      response: data,
    });
  } else if (duration > 5000) {
    logger.warn(`Slow API Request: ${requestLog.method} ${requestLog.url}`, {
      status: response.status,
      duration,
    });
  }
};

/**
 * Strip sensitive data from URLs (passwords, tokens, etc)
 */
function stripSensitiveData(url) {
  const sensitiveParams = [
    'password',
    'token',
    'key',
    'secret',
    'apikey',
    'access_token',
    'authorization',
  ];

  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    sensitiveParams.forEach(param => {
      if (params.has(param)) {
        params.set(param, '***');
      }
    });

    urlObj.search = params.toString();
    return urlObj.toString();
  } catch {
    // If URL parsing fails, return original (shouldn't happen)
    return url;
  }
}

/**
 * Log authentication events
 */
export const logAuthEvent = (event, userId = null) => {
  logger.logAuthEvent(event, {
    userId: userId || 'anonymous',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Log user actions (navigation, clicks, etc)
 */
export const logUserAction = (action, component = null) => {
  logger.logUserAction(action, {
    component,
    timestamp: new Date().toISOString(),
  });
};
