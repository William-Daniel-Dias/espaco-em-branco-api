import { DataTypes } from 'sequelize';
import { database } from '../config/database.js';

export const Payment = database.define('Payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    eventId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'event_id',
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: {
                args: [0.01],
                msg: 'Payment value must be greater than 0.'
            }
        }
    },
}, {
    tableName: 'payments',
    timestamps: true, // Adiciona createdAt e updatedAt
    underscored: true
});