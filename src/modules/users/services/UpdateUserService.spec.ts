import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let updateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    updateUser = new UpdateUserService(fakeUsersRepository);
  });

  it('should be able to update an user with entered data', async () => {
    const user = await createUser.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    await updateUser.execute({
      id: user.id,
      name: 'John Doe',
      description: 'Hello!',
      profession: 'Developer',
      company: 'Facebook',
      interests: 'Nodejs, ReactJS',
    });

    expect(user.name).toBe('John Doe');
  });

  it('should be able to update an user with empty data', async () => {
    const user = await createUser.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    await updateUser.execute({
      id: user.id,
      name: '',
      description: '',
      profession: '',
      company: '',
      interests: '',
    });

    expect(user.name).toBe(null);
  });

  it('should not be able to update another user', async () => {
    await expect(
      updateUser.execute({
        id: 'id',
        name: 'John Doe',
        description: 'Hello!',
        profession: 'Developer',
        company: 'Facebook',
        interests: 'Nodejs, ReactJS',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
