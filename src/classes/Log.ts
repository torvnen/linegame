import { decorate, computed, observable } from "mobx";

export enum LogLevel {
  None = 0,
  Verbose,
  Debug,
  Info,
  Warning,
  Error,
}

class Log {
  MIN_LEVEL = LogLevel.Debug;

  get minLevel(): String {
    return LogLevel[this.MIN_LEVEL];
  }
  group(label: String) {
    console.groupCollapsed(label);
  }
  groupEnd() {
    console.groupEnd();
  }
  v(message?: any, ...optionalParams: any[]) {
    if (this.MIN_LEVEL == LogLevel.Verbose) {
      console.debug(message, ...optionalParams);
    }
  }
  d(message?: any, ...optionalParams: any[]) {
    if (this.MIN_LEVEL !== LogLevel.None && this.MIN_LEVEL <= LogLevel.Debug) {
      console.debug(message, ...optionalParams);
    }
  }
  i(message?: any, ...optionalParams: any[]) {
    if (this.MIN_LEVEL !== LogLevel.None && this.MIN_LEVEL <= LogLevel.Info)
      console.info(message, ...optionalParams);
  }
  w(message?: any, ...optionalParams: any[]) {
    if (this.MIN_LEVEL !== LogLevel.None && this.MIN_LEVEL <= LogLevel.Warning)
      console.warn(message, ...optionalParams);
  }
  e(message?: any, ...optionalParams: any[]) {
    if (this.MIN_LEVEL !== LogLevel.None)
      console.error(message, ...optionalParams);
  }
}

const log = new Log();

export function decreaseLogLevel() {
  if (log.MIN_LEVEL - 1 === -1) log.MIN_LEVEL = LogLevel.Error;
  else log.MIN_LEVEL--;
}

export function setLogLevel(level: LogLevel) {
  log.MIN_LEVEL = level;
}

export default log;
