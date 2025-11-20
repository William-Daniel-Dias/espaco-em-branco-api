import { Router } from 'express';
import { makeUserController } from '../modules/users/user.controller.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema, createUserSchema, loginUserSchema } from '../modules/users/user.schemas.js';

export const authRouter = () => {
    const router = Router();
    const ctrl = makeUserController()

    router.post('/register', validate({ body: createUserSchema() }), ctrl.register);
    router.post('/login', validate({ body: loginUserSchema() }), ctrl.login);

    return router;
};