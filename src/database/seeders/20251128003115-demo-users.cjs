'use strict'
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        id: uuidv4(),
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password_hash: await bcrypt.hash('senha123', 10),
        user_type: 'artist',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Maria Santos',
        email: 'maria.santos@example.com',
        password_hash: await bcrypt.hash('senha123', 10),
        user_type: 'artist',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Pedro Oliveira',
        email: 'pedro.oliveira@example.com',
        password_hash: await bcrypt.hash('senha123', 10),
        user_type: 'artist',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Galeria Arte Moderna',
        email: 'contato@galeriamoderna.com',
        password_hash: await bcrypt.hash('senha123', 10),
        user_type: 'supporter',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Teatro Municipal',
        email: 'contato@teatromunicipal.com',
        password_hash: await bcrypt.hash('senha123', 10),
        user_type: 'supporter',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Centro Cultural SP',
        email: 'contato@centroculturalsp.com',
        password_hash: await bcrypt.hash('senha123', 10),
        user_type: 'supporter',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Ana Costa',
        email: 'ana.costa@example.com',
        password_hash: await bcrypt.hash('senha123', 10),
        user_type: 'public',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Carlos Mendes',
        email: 'carlos.mendes@example.com',
        password_hash: await bcrypt.hash('senha123', 10),
        user_type: 'public',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Beatriz Lima',
        email: 'beatriz.lima@example.com',
        password_hash: await bcrypt.hash('senha123', 10),
        user_type: 'public',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Rafael Souza',
        email: 'rafael.souza@example.com',
        password_hash: await bcrypt.hash('senha123', 10),
        user_type: 'public',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    await queryInterface.bulkInsert('users', users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
