import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { RegisterUserDTO } from './user.dto';
import { User } from './user.entity';
import { UserRepositoryFake } from './user.repository.fake';
import { UserService } from './user.service';
import { DefaultResponseDTO } from '../../shared/dto/default-response.dto';
import { SUCCESS, USER_CREATED } from '../../shared/constants/strings';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryFake,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('createUser', () => {
    it('should return the found user', async () => {
      const createUserMock: RegisterUserDTO = {
        name: 'TEST_NAME',
        email: 'TEST_EMAIL',
        password: 'TEST_PASS',
      };

      const user = new User();
      user.name = createUserMock.name;
      user.email = createUserMock.email;
      user.password = createUserMock.password;

      const expectedResult: DefaultResponseDTO<User> = {
        message: USER_CREATED,
        data: user,
      };

      const createUserSpy = jest.spyOn(userService, 'create').mockResolvedValue(user);

      const receivedResult = await userController.create(createUserMock);

      expect(createUserSpy).toHaveBeenCalledWith(createUserMock);
      expect(receivedResult).toStrictEqual(expectedResult);
    });
  });

  describe('findUser', () => {
    it('should return the found user', async () => {
      const user = new User();

      const expectedResult: DefaultResponseDTO<User> = {
        message: SUCCESS,
        data: user,
      };

      const findUserSpy = jest.spyOn(userService, 'findUser').mockResolvedValue(user);

      const TEST_ID = 1;
      const receivedResult = await userController.findUser(TEST_ID);

      expect(findUserSpy).toHaveBeenCalledWith(TEST_ID);
      expect(receivedResult).toStrictEqual(expectedResult);
    });
  });

  describe('delete', () => {
    it('should delete the user', async () => {
      const expectedResult: DefaultResponseDTO<User> = {
        message: SUCCESS,
      };

      const deleteUserSpy = jest.spyOn(userService, 'delete').mockResolvedValue(true);

      const TEST_ID = 1;
      const receivedResult = await userController.delete(TEST_ID);

      expect(deleteUserSpy).toHaveBeenCalledWith(TEST_ID);
      expect(receivedResult).toStrictEqual(expectedResult);
    });

    it('should not allow self-delete', async () => {
      const TEST_ID = 1;
      const receivedResultPromise = userController.delete(TEST_ID);

      await expect(receivedResultPromise).rejects.toThrow(BadRequestException);
    });
  });
});
