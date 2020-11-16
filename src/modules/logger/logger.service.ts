import * as winston from 'winston';
import * as chalk from 'chalk';
import { LoggerOptions } from 'winston';
import { Injectable, LoggerService, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger implements LoggerService {
  private readonly logger;

  private level = 'info';

  private context: string;

  private static LOGS_PATH = 'storage/logs';

  constructor() {
    this.logger = (winston as any).createLogger(this.getLoggerOptions(this.level));
  }

  /**
   *
   * @param {string} level
   * @returns {winston.LoggerOptions}
   */
  public getLoggerOptions(level: string): LoggerOptions {
    return {
      level: level,
      transports: [
        new winston.transports.File({
          filename: `${MyLogger.LOGS_PATH}/${level}.log`,
        }),
      ],
    };
  }

  /**
   *
   * @param {string} context
   * @returns {this}
   */
  public setContext(context: string): this {
    this.context = context;

    return this;
  }

  /**
   *
   * @param {string} level
   */
  public setLevel(level: string): this {
    this.level = level;

    const loggerOptions = this.getLoggerOptions(level);
    this.overrideOptions(loggerOptions);

    return this;
  }

  /**
   *
   * @param {string} message
   */
  log(message: string): void {
    this.setLevel('info');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });

    if (this.context !== 'TypeORMLogger') {
      this.logToConsole('info', message);
    }
  }

  /**
   *
   * @param {string} message
   * @param trace
   */
  error(message: string, trace?: string): void {
    this.setLevel('error');
    const currentDate = new Date();
    // i think the trace should be JSON Stringified
    this.logger.error(`${message} -> (${trace || 'trace not provided !'})`, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('error', message, trace);
  }

  /**
   *
   * @param {string} message
   */
  warn(message: string): void {
    this.setLevel('warn');
    const currentDate = new Date();
    this.logger.warn(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('warn', message);
  }

  /**
   *
   * @param {string} message
   */
  info(message: string): void {
    this.setLevel('info');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('info', message);
  }

  /**
   *
   * @param {string} message
   */
  debug(message: string): void {
    this.setLevel('debug');
    const currentDate = new Date();
    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.logToConsole('debug', message);
  }

  /**
   *
   * @param {winston.LoggerOptions} options
   */
  overrideOptions(options: LoggerOptions): void {
    this.logger.configure(options);
  }

  // this method just for printing a cool log in your terminal , using chalk
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  private logToConsole(level: string, message: string, error?): void {
    let result;
    const color = chalk.default;
    const currentDate = new Date();
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    switch (level) {
      default:
      case 'info':
        result = `[${color.blue('INFO')}] ${color.dim.yellow.bold.underline(time)} [${color.green(
          this.context,
        )}] ${message}`;
        break;
      case 'error':
        result = `[${color.red('ERR')}] ${color.dim.yellow.bold.underline(time)} [${color.green(
          this.context,
        )}] ${message}`;
        break;
      case 'warn':
        result = `[${color.yellow('WARN')}] ${color.dim.yellow.bold.underline(time)} [${color.green(
          this.context,
        )}] ${message}`;
        break;
    }
    console.log(result);
  }
}
