import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    return res.json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      password,
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { name, description, profession, company, interests } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      description,
      profession,
      company,
      interests,
    });

    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const usersRepository = new UsersRepository();

    await usersRepository.delete(id);

    return res.status(200).send();
  }
}

export default UsersController;
