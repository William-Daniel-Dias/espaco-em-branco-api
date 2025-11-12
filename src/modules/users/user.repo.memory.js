let users = [];
export const makeUserRepoMemory = () => {
    const create = async ({ name, email, passwordHash }) => {
        const id = users.length + 1;
        const user = { id, name, email, passwordHash };
        users.push(user);
        return user;
    };
    const findByEmail = async (email) => users.find(u => u.email === email) ?? null;
    return { create, findByEmail };
};