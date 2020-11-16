import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserRepositoryFake } from './user.repository.fake';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryFake,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('findUser: should return the user by id', async () => {
    const TEST_ID = 1;

    const user: User = new User();
    const findUserByIdSpy = jest.spyOn(service, 'findUserById').mockResolvedValue(user);

    const expectedResult: User = user;

    const receivedResult = await service.findUser(TEST_ID);

    expect(findUserByIdSpy).toHaveBeenCalledWith(TEST_ID);
    expect(receivedResult).toStrictEqual(expectedResult);
  });
});
