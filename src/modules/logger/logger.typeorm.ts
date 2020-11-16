import { Logger } from 'typeorm';
import { MyLogger } from './logger.service';
import { LOGGING_LEVELS } from '../../database/config';

export class TypeORMLogger implements Logger {
  private logger;

  constructor() {
    this.logger = new MyLogger();
    this.logger.setContext('TypeORMLogger');
  }

  /**
   *
   * @param {string} query
   * @param {any[]} parameters
   * @returns {any}
   */
  logQuery(query: string, parameters?: any[]): any {
    if (LOGGING_LEVELS.includes('query')) {
      this.logger.debug(`${query}, ${parameters}`);
    }
  }

  /**
   *
   * @param {"log" | "info" | "warn"} level
   * @param message
   * @returns {any}
   */
  log(level: 'log' | 'info' | 'warn', message: string): any {
    this.logger.log(message, level);
  }

  /**
   *
   * @param {string} error
   * @param {string} query
   * @param {any[]} parameters
   * @returns {any}
   */
  logQueryError(error: string, query: string, parameters?: any[]): any {
    this.logger.error(`${error}, ${query}, ${parameters}`);
  }

  /**
   *
   * @param {number} time
   * @param {string} query
   * @param {any[]} parameters
   * @returns {any}
   */
  logQuerySlow(time: number, query: string, parameters?: any[]): any {
    this.logger.info(`${time}, ${query}, ${parameters}`);
  }

  /**
   *
   * @param {string} message
   * @returns {any}
   */
  logMigration(message: string): any {
    this.logger.info(message);
  }

  /**
   *
   * @param {string} message
   * @returns {any}
   */
  logSchemaBuild(message: string): any {
    this.logger.info(message);
  }
}
