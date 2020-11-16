import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserFilterDTO } from './user-filter.dto';
import { UserController } from './user.controller';
import { CreateUserDTO } from './user.dto';
import { User } from './user.entity';
import { UserRepositoryFake } from './user.repository.fake';
import { UserService } from './user.service';
import { JwtRequest } from '../auth/auth.dto';
import { PaginationDTO } from '../../shared/dto/pagination.dto';
import { OrderDirection, SortOrderDTO } from '../../shared/dto/sort-order.dto';
import { DefaultResponseDTO } from '../../shared/dto/default-response.dto';
import { SUCCESS, USER_CREATED } from '../../shared/constants/strings';
import { ListDTO } from '../../shared/dto/list.dto';

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
      const createUserMock: CreateUserDTO = {
        email: 'TEST_EMAIL',
        role: 'TEST_ROLE',
      };

      const user = new User();
      user.name = 'TEST_NAME';
      user.email = createUserMock.email;
      user.role = createUserMock.role;

      const expectedResult: DefaultResponseDTO<User> = {
        message: USER_CREATED,
        data: user,
      };

      const createUserSpy = jest.spyOn(userService, 'createUser').mockResolvedValue(user);

      const receivedResult = await userController.createUser(createUserMock);

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

  describe('deleteUser', () => {
    it('should delete the user', async () => {
      const expectedResult: DefaultResponseDTO<User> = {
        message: SUCCESS,
      };

      const deleteUserSpy = jest.spyOn(userService, 'deleteUser').mockResolvedValue(true);

      const mockRequest = { user: { id: null } } as JwtRequest;
      const TEST_ID = 1;
      const receivedResult = await userController.deleteUser(TEST_ID, mockRequest);

      expect(deleteUserSpy).toHaveBeenCalledWith(TEST_ID);
      expect(receivedResult).toStrictEqual(expectedResult);
    });

    it('should not allow self-delete', async () => {
      const TEST_ID = 1;
      const mockRequest = { user: { id: TEST_ID } } as JwtRequest;
      const receivedResultPromise = userController.deleteUser(TEST_ID, mockRequest);

      await expect(receivedResultPromise).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAllUsers', () => {
    it('should return all users, paginated', async () => {
      const sortOrderDTO: SortOrderDTO = {
        order: 'ASC' as OrderDirection,
        sortBy: 'TEST_SORT_BY',
      };

      const paginationDTO: PaginationDTO = {
        page: 1,
        limit: 5,
        totalPages: 2,
        totalCount: 9,
      };

      const filterDTO: UserFilterDTO = {};

      const search = '';

      const usersListMock: ListDTO<User> = {
        listData: [],
        pagination: paginationDTO,
        sortOrder: sortOrderDTO,
      };

      const expectedResult: DefaultResponseDTO<User[]> = {
        message: SUCCESS,
        data: usersListMock.listData,
        pagination: usersListMock.pagination,
        sortOrder: sortOrderDTO,
      };

      const findAllSpy = jest.spyOn(userService, 'findAll').mockResolvedValue(usersListMock);

      const receivedResult = await userController.findAllUsers(paginationDTO, sortOrderDTO, filterDTO, search);

      expect(findAllSpy).toHaveBeenCalledWith(paginationDTO, sortOrderDTO, filterDTO, search);
      expect(receivedResult).toStrictEqual(expectedResult);
    });
  });
});
