import { DataTypes } from 'sequelize';
import { database } from '../config/database.js';

export const User = database.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [3, 100],
                msg: 'Name must be between 3 and 100 characters long.'
            }
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
            msg: 'Email already registered.'
        },
        validate: {
            isEmail: {
                msg: 'Invalid email format.'
            }
        }
    },
    passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash'
    },
    userType: {
        type: DataTypes.ENUM('artist', 'supporter', 'public'),
        allowNull: false,
        field: 'user_type',
        validate: {
            isIn: {
                args: [['artist', 'supporter', 'public']],
                msg: 'Invalid user type. Must be artist, supporter, or public.'
            }
        }
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true
});