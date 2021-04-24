import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  description: string;
  profession: string;
  company: string;
  interests: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    profession,
    company,
    interests,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    Object.assign(user, {
      name: name && name ? name : null,
      description: description && description ? description : null,
      profession: profession && profession ? profession : null,
      company: company && company ? company : null,
      interests: interests && interests ? interests : null,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
