/**
 * Centralized Logging Service
 * Routes logs to Sentry in production, console in development
 * Provides structured logging with different severity levels
 */

import * as Sentry from "@sentry/react";

const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

class Logger {
  constructor() {
    this.isProduction = process.env.REACT_APP_ENV === 'production';
  }

  /**
   * Internal log method
   */
  _log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...data,
    };

    // Always log to console in development
    if (!this.isProduction) {
      const style = this._getConsoleStyle(level);
      console.log(
        `%c[${level.toUpperCase()}] ${message}`,
        style,
        data
      );
    }

    // Send to Sentry in production
    if (this.isProduction && level !== LOG_LEVELS.DEBUG) {
      Sentry.captureMessage(message, level);
      if (data && Object.keys(data).length > 0) {
        Sentry.setContext('logData', data);
      }
    }
  }

  /**
   * Get console style based on log level
   */
  _getConsoleStyle(level) {
    const styles = {
      debug: 'color: #999; font-size: 11px;',
      info: 'color: #0066cc; font-weight: bold;',
      warn: 'color: #ff9900; font-weight: bold;',
      error: 'color: #cc0000; font-weight: bold;',
    };
    return styles[level] || '';
  }

  /**
   * Debug level - detailed information
   */
  debug(message, data = {}) {
    this._log(LOG_LEVELS.DEBUG, message, data);
  }

  /**
   * Info level - general information
   */
  info(message, data = {}) {
    this._log(LOG_LEVELS.INFO, message, data);
  }

  /**
   * Warn level - warning messages
   */
  warn(message, data = {}) {
    this._log(LOG_LEVELS.WARN, message, data);
  }

  /**
   * Error level - errors that need attention
   */
  error(message, error = null, data = {}) {
    const errorData = {
      ...data,
      ...(error && {
        errorMessage: error.message,
        errorStack: error.stack,
      }),
    };
    this._log(LOG_LEVELS.ERROR, message, errorData);
  }

  /**
   * Log API request
   */
  logRequest(method, url, status = null, duration = 0) {
    const level = status && status >= 400 ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG;
    this._log(level, `API ${method} ${url}`, {
      status,
      duration: `${duration}ms`,
      type: 'api_request',
    });
  }

  /**
   * Log user action
   */
  logUserAction(action, details = {}) {
    this._log(LOG_LEVELS.INFO, action, {
      ...details,
      type: 'user_action',
    });
  }

  /**
   * Log authentication event
   */
  logAuthEvent(event, details = {}) {
    this._log(LOG_LEVELS.INFO, `Auth: ${event}`, {
      ...details,
      type: 'auth_event',
    });
  }
}

// Export singleton instance
export const logger = new Logger();

export default logger;
