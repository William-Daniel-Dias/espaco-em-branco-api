import { makeUserService } from './user.service.js';

export const makeUserController = () => {
    const userService = makeUserService();


    const register = async (req, res, next) => {
        try {
            const newUser = await userService.registerUser(req.body);
            return res.status(201).json(newUser);
        } catch (error) { 
            next(error);
        }
    };

    const login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const response = await userService.authenticateUser({ email, password });

            return res.status(200).json(response);
        } catch (error) { 
            next(error); 
        }
    };


    return { 
        register, 
        login
    };
};