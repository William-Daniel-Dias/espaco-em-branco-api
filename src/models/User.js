import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [3, 100],
                msg: 'Nome deve ter entre 3 e 100 caracteres'
            }
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
            msg: 'Email já cadastrado'
        },
        validate: {
            isEmail: {
                msg: 'Email inválido'
            }
        }
    },
    passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash'
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_admin'
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true
});
export default User;