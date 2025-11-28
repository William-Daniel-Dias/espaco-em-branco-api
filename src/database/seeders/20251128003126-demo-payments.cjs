'use strict'
const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    // Busca usuários públicos e eventos
    const publicUsers = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type = 'public' ORDER BY created_at;`,
      { type: Sequelize.QueryTypes.SELECT }
    )

    const events = await queryInterface.sequelize.query(
      `SELECT id FROM events ORDER BY created_at;`,
      { type: Sequelize.QueryTypes.SELECT }
    )

    const payments = [
      // Pagamentos para o primeiro evento
      {
        id: uuidv4(),
        event_id: events[0].id,
        user_id: publicUsers[0].id,
        value: 500.00,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: uuidv4(),
        event_id: events[0].id,
        user_id: publicUsers[1].id,
        value: 250.50,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        id: uuidv4(),
        event_id: events[0].id,
        user_id: publicUsers[2].id,
        value: 500.00,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },

      // Pagamentos para o segundo evento
      {
        id: uuidv4(),
        event_id: events[1].id,
        user_id: publicUsers[0].id,
        value: 350.00,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: uuidv4(),
        event_id: events[1].id,
        user_id: publicUsers[3].id,
        value: 500.00,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },

      // Pagamentos para o terceiro evento
      {
        id: uuidv4(),
        event_id: events[2].id,
        user_id: publicUsers[1].id,
        value: 1000.00,
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        id: uuidv4(),
        event_id: events[2].id,
        user_id: publicUsers[2].id,
        value: 800.00,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        id: uuidv4(),
        event_id: events[2].id,
        user_id: publicUsers[3].id,
        value: 1400.00,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },

      // Pagamentos para o quarto evento
      {
        id: uuidv4(),
        event_id: events[3].id,
        user_id: publicUsers[0].id,
        value: 200.00,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: uuidv4(),
        event_id: events[3].id,
        user_id: publicUsers[2].id,
        value: 220.00,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },

      // Pagamentos para o quinto evento
      {
        id: uuidv4(),
        event_id: events[4].id,
        user_id: publicUsers[1].id,
        value: 2000.00,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: uuidv4(),
        event_id: events[4].id,
        user_id: publicUsers[3].id,
        value: 1500.00,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: uuidv4(),
        event_id: events[4].id,
        user_id: publicUsers[0].id,
        value: 2000.00,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },

      // Pagamentos para o sexto evento
      {
        id: uuidv4(),
        event_id: events[5].id,
        user_id: publicUsers[2].id,
        value: 1000.00,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: uuidv4(),
        event_id: events[5].id,
        user_id: publicUsers[3].id,
        value: 1100.00,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]

    await queryInterface.bulkInsert('payments', payments, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payments', null, {})
  }
}
