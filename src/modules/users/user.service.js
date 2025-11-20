import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from '../../config/env.js';
import { HttpError } from '../../utils/httpError.js';
import { makeUserRepository } from './user.repository.js';


export const makeUserService = () => {
    const userRepository = makeUserRepository();
    const SALT_ROUNDS = 10;
    
    const registerUser = async ({ name, email, password, userType }) => {
        const existingUser = await userRepository.findByEmail({ email });

        if (existingUser) {
                throw new HttpError('Email already in use', 419, 'EMAIL_IS_TAKEN');
        }
            
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await userRepository.create({
            name,
            email,
            passwordHash,
            userType
        });

        const { passwordHash: _, ...userWithoutHash } = newUser;
        return userWithoutHash;
    };

    const authenticateUser = async ({ email, password }) => {
        const user = await userRepository.findByEmail({ email });

        if (!user) {
             throw new HttpError('User not found', 404, 'USER_NOT_FOUND');
        }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if(!isPasswordValid) {
             throw new HttpError('Invalid password.', 401, 'INVALID_PASSWORD');
        }


    const accessToken = jwt.sign({},
        env.jwtSecret,
        {
            subject: String(user.id),
            expiresIn: env.jwtExpiresIn
        }
    )

    const { passwordHash: _, ...userWithoutHash } = user;
    return { user: userWithoutHash, accessToken };
    }

    const getUserById = async ({id}) => {
        const user = await userRepository.findById({ id });
        if(!user) {
            return null;
        }
        const { passwordHash: _, ...userWithoutHash } = user;
        return userWithoutHash;
    }


    return {
        registerUser,
        authenticateUser,
        getUserById
    };
};