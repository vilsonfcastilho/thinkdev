import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import GetUserController from '@modules/users/infra/http/controllers/GetUserController';

const usersRouter = Router();
const usersController = new UsersController();
const getUserController = new GetUserController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.get('/', ensureAuthenticated, usersController.index);

usersRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      profession: Joi.string().required(),
      company: Joi.string().required(),
      interests: Joi.string().required(),
    },
  }),
  usersController.update,
);

usersRouter.delete('/', ensureAuthenticated, usersController.delete);

usersRouter.get('/:id', getUserController.index);

export default usersRouter;
