import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm/index';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   *
   * @param {string} email
   * @returns {Promise<User>}
   */
  async findByEmail(email: string): Promise<User> {
    return await this.findOne({
      where: {
        email: email,
      },
    });
  }
}
