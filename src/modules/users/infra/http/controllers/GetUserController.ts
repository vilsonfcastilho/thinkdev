import { Request, Response } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

class GetUserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    return res.json(user);
  }
}

export default GetUserController;
