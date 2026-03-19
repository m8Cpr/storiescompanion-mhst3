import { isDevelopmentMode } from "./lib";

type LogLevel = "log" | "error" | "warn" | "debug" | "info";

class Logger implements Record<LogLevel, (...args: unknown[]) => void> {
  private shouldLog(level: LogLevel): boolean {
    // Always log errors in production for critical issues
    if (level === "error") {
      return true;
    }

    // For all other log levels, only log in development mode
    return isDevelopmentMode();
  }

  log(...args: unknown[]) {
    if (this.shouldLog("log")) console.log(...args);
  }

  error(...args: unknown[]) {
    if (this.shouldLog("error")) console.error(...args);
  }

  warn(...args: unknown[]) {
    if (this.shouldLog("warn")) console.warn(...args);
  }

  debug(...args: unknown[]) {
    if (this.shouldLog("debug")) console.log("[DEBUG]", ...args);
  }

  info(...args: unknown[]) {
    if (this.shouldLog("info")) console.info(...args);
  }
}

// Export a singleton instance
export const logger = new Logger();
