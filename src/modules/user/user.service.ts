import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { RegisterUserDTO, UpdateUserDTO } from './user.dto';
import { UserRepository } from './user.repository';
import { plainToClass } from 'class-transformer';
import { ROLES } from '../../shared/constants/constants';
import { USER_NOT_FOUND } from '../../shared/constants/strings';

@Injectable()
export class UserService {
  /**
   *
   * @param {UserRepository} userRepository
   */
  constructor(private userRepository: UserRepository) {}

  /**
   *
   * @returns {Promise<User[]>}
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   *
   * @param {number} id
   * @returns {Promise<User>}
   */
  async findUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  /**
   *
   * @param {RegisterUserDTO} userDTO
   * @returns {Promise<User>}
   */
  async create(userDTO: RegisterUserDTO): Promise<User> {
    const user = new User();
    user.name = userDTO.name;
    user.email = userDTO.email;
    user.password = userDTO.password;
    user.role = ROLES.USER;

    return this.userRepository.save(user);
  }

  /**
   *
   * @param {number} userId
   * @param {UpdateUserDTO} data
   * @returns {Promise<User>}
   */
  async update(userId: number, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      return user;
    }

    const newData = plainToClass(User, data);

    return await this.userRepository.save(newData);
  }

  /**
   *
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  async delete(id: number): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }
}
