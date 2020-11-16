/* eslint-disable @typescript-eslint/no-empty-function */

export class UserRepositoryFake {
  public create(): void {}

  public async save(): Promise<void> {}

  public async remove(): Promise<void> {}

  public async findOne(): Promise<void> {}

  findActiveUsersByEmail = async (): Promise<void> => {};

  findById = async (): Promise<void> => {};

  createUser = async (): Promise<void> => {};

  updateUser = async (): Promise<void> => {};

  deleteUser = async (): Promise<void> => {};

  findAllUsers = async (): Promise<void> => {};

  findUserById = async (): Promise<void> => {};
}
