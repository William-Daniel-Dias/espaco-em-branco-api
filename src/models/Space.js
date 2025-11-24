import { DataTypes } from 'sequelize';
import { database } from '../config/database.js';

export const Space = database.define('Space', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    supporterId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'supporter_id',
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [3, 100],
                msg: 'Space name must be between 3 and 100 characters long.'
            }
        }
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: {
                args: [5, 255],
                msg: 'Address must be between 5 and 255 characters long.'
            }
        }
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1],
                msg: 'Capacity must be at least 1.'
            }
        }
    },
    photoUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'photo_url',
        validate: {
            isUrl: {
                msg: 'Invalid URL format for photo.'
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'spaces',
    timestamps: true,
    underscored: true
});