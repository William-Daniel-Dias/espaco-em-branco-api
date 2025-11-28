'use strict'
const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    // Busca os supporters para usar seus IDs
    const supporters = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE user_type = 'supporter' ORDER BY created_at LIMIT 3;`,
      { type: Sequelize.QueryTypes.SELECT }
    )

    const spaces = [
      {
        id: uuidv4(),
        supporter_id: supporters[0].id,
        name: 'Sala Principal',
        address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP',
        capacity: 200,
        photo_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        description: 'Amplo espaço com iluminação profissional e sistema de som de alta qualidade. Ideal para exposições e performances.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        supporter_id: supporters[0].id,
        name: 'Espaço Íntimo',
        address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP',
        capacity: 50,
        photo_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
        description: 'Ambiente aconchegante perfeito para apresentações intimistas e workshops.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        supporter_id: supporters[1].id,
        name: 'Palco Principal',
        address: 'Praça Ramos de Azevedo, s/n - República, São Paulo - SP',
        capacity: 500,
        photo_url: 'https://images.unsplash.com/photo-1503095396549-807759245b35',
        description: 'Teatro histórico com arquitetura clássica e acústica excepcional.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        supporter_id: supporters[1].id,
        name: 'Sala de Ensaio',
        address: 'Praça Ramos de Azevedo, s/n - República, São Paulo - SP',
        capacity: 80,
        photo_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
        description: 'Espaço equipado para ensaios e apresentações experimentais.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        supporter_id: supporters[2].id,
        name: 'Auditório Cultural',
        address: 'Rua Vergueiro, 1000 - Liberdade, São Paulo - SP',
        capacity: 300,
        photo_url: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b0',
        description: 'Moderno auditório com recursos audiovisuais de última geração.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        supporter_id: supporters[2].id,
        name: 'Galeria de Arte',
        address: 'Rua Vergueiro, 1000 - Liberdade, São Paulo - SP',
        capacity: 150,
        photo_url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec',
        description: 'Espaço versátil com paredes brancas e iluminação ajustável para exposições.',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    await queryInterface.bulkInsert('spaces', spaces, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('spaces', null, {})
  }
}
