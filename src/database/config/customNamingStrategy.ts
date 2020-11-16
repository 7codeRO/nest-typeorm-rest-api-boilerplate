import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  /**
   * Converts camelCase to under_score
   *
   * @param propertyName
   */
  columnName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}
