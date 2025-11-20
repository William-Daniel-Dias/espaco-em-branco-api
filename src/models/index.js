import { User } from './User.js';
import { Space } from './Space.js';
import { Event } from './Event.js';
import { Payment } from './Payment.js';
import { database } from '../config/database.js';
import { env } from '../config/env.js';

// --- Definição das Associações ---

// Um Usuário (Apoiador) pode ter muitos Espaços
User.hasMany(Space, {
    foreignKey: 'supporter_id',
    as: 'supportedSpaces', // Alias para a associação
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
Space.belongsTo(User, {
    foreignKey: 'supporter_id',
    as: 'supporter' // Alias para a associação
});

// Um Usuário (Artista) pode criar muitos Eventos
User.hasMany(Event, {
    foreignKey: 'artist_id',
    as: 'createdEvents', // Alias para a associação
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
Event.belongsTo(User, {
    foreignKey: 'artist_id',
    as: 'artist' // Alias para a associação
});

// Um Espaço pode sediar muitos Eventos
Space.hasMany(Event, {
    foreignKey: 'space_id',
    as: 'hostedEvents', // Alias para a associação
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
Event.belongsTo(Space, {
    foreignKey: 'space_id',
    as: 'space' // Alias para a associação
});

// Um Usuário (Público) pode fazer muitos Pagamentos
User.hasMany(Payment, {
    foreignKey: 'user_id',
    as: 'paymentsMade', // Alias para a associação
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
Payment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'payer' // Alias para a associação
});

// Um Evento pode receber muitos Pagamentos
Event.hasMany(Payment, {
    foreignKey: 'event_id',
    as: 'receivedPayments', // Alias para a associação
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
Payment.belongsTo(Event, {
    foreignKey: 'event_id',
    as: 'event' // Alias para a associação
});

// Exporta todos os modelos e o objeto sequelize
const models = {
    database,
    User,
    Space,
    Event,
    Payment
};

if (env.nodeEnv === 'development') {
    database.sync({ alter: true }) // <--- MUDANÇA AQUI: de 'alter: true' para 'force: true'
        .then(() => console.log('✅ Models synced '))
        .catch(err => console.error('❌ Sync error :', err));
}

export default models;