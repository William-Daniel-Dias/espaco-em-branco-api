import { DataTypes } from 'sequelize';
import { database } from '../config/database.js';

export const Event = database.define('Event', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    artistId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'artist_id',
    },
    spaceId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'space_id',
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            len: {
                args: [5, 150],
                msg: 'Event title must be between 5 and 150 characters long.'
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: {
                args: [20, 1000],
                msg: 'Event description must be between 20 and 1000 characters long.'
            }
        }
    },
    dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_time',
        validate: {
            isDate: {
                msg: 'Invalid date and time format.'
            },
            isAfter: {
                args: new Date().toISOString(), // Garante que a data do evento seja no futuro
                msg: 'Event date must be in the future.'
            }
        }
    },
    financialGoal: {
        type: DataTypes.DECIMAL(10, 2), // Ex: 99999999.99
        allowNull: false,
        field: 'financial_goal',
        validate: {
            min: {
                args: [0.01],
                msg: 'Financial goal must be greater than 0.'
            }
        }
    },
    currentProgress: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        field: 'current_progress',
        validate: {
            min: {
                args: [0],
                msg: 'Current progress cannot be negative.'
            }
        }
    },
    imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'image_url',
        validate: {
            isUrl: {
                msg: 'Invalid URL format for image.'
            }
        }
    },
    status: {
        type: DataTypes.ENUM('active', 'finished', 'cancelled'),
        allowNull: false,
        defaultValue: 'active',
        validate: {
            isIn: {
                args: [['active', 'finished', 'cancelled']],
                msg: 'Invalid event status. Must be active, finished, or cancelled.'
            }
        }
    }
}, {
    tableName: 'events',
    timestamps: true,
    underscored: true
});