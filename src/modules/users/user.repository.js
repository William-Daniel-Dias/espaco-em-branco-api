import User from "../../models/User.js";

export const makeUserRepository = () => {
    const create = async ({ name, email, passwordHash, userType }) => {
        const user = await User.create({ name, email, passwordHash, userType });

        return user.toJSON();
    }

    const findById = async ({ id }) => {
        const user = await User.findByPk(id);
        return user ? user.toJSON() : null;
    }

    const findByEmail = async ({ email }) => {
        const user = await User.findOne({ where: { email } });
        return user ? user.toJSON() : null;
    }

    return {
        create,
        findById,
        findByEmail
    }
};