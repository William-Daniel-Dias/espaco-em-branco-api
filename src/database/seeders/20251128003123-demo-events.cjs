'use strict'
const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    try {// Busca artistas e espaços
      const artists = await queryInterface.sequelize.query(
        `SELECT id FROM users WHERE user_type = 'artist' ORDER BY created_at LIMIT 3;`,
        { type: Sequelize.QueryTypes.SELECT }
      )

      const spaces = await queryInterface.sequelize.query(
        `SELECT id FROM spaces ORDER BY created_at LIMIT 6;`,
        { type: Sequelize.QueryTypes.SELECT }
      )

      // Datas futuras para os eventos
      const getDate = (daysFromNow) => {
        const date = new Date()
        date.setDate(date.getDate() + daysFromNow)
        return date
      }

      const events = [
        {
          id: uuidv4(),
          artist_id: artists[0].id,
          space_id: spaces[0].id,
          title: 'Exposição: Cores do Brasil',
          description: 'Uma jornada visual pelas paisagens e culturas brasileiras através de pinturas vibrantes e fotografias marcantes. A exposição celebra a diversidade do nosso país.',
          date_time: getDate(15),
          financial_goal: 5000.00,
          current_progress: 1250.50,
          image_url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          artist_id: artists[0].id,
          space_id: spaces[1].id,
          title: 'Workshop: Técnicas de Aquarela',
          description: 'Aprenda técnicas fundamentais e avançadas de pintura em aquarela com materiais profissionais. Inclui material didático e coffee break.',
          date_time: getDate(8),
          financial_goal: 2000.00,
          current_progress: 850.00,
          image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          artist_id: artists[1].id,
          space_id: spaces[2].id,
          title: 'Concerto: Noite de Jazz',
          description: 'Uma noite especial com os maiores clássicos do jazz interpretados por músicos renomados. Repertório inclui Miles Davis, John Coltrane e composições originais.',
          date_time: getDate(22),
          financial_goal: 8000.00,
          current_progress: 3200.00,
          image_url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          artist_id: artists[1].id,
          space_id: spaces[3].id,
          title: 'Sarau Poético',
          description: 'Encontro mensal de poesia com apresentações de artistas locais e convidados especiais. Espaço aberto para declamações e performances.',
          date_time: getDate(30),
          financial_goal: 1500.00,
          current_progress: 420.00,
          image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          artist_id: artists[2].id,
          space_id: spaces[4].id,
          title: 'Peça Teatral: Memórias de Papel',
          description: 'Drama contemporâneo que explora as relações familiares através de cartas antigas encontradas em um sótão. Direção premiada e elenco experiente.',
          date_time: getDate(45),
          financial_goal: 10000.00,
          current_progress: 5500.00,
          image_url: 'https://images.unsplash.com/photo-1503095396549-807759245b35',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),
          artist_id: artists[2].id,
          space_id: spaces[5].id,
          title: 'Instalação Interativa: Luz e Sombra',
          description: 'Experiência imersiva que convida o público a explorar a relação entre luz, sombra e percepção através de projeções e sensores de movimento.',
          date_time: getDate(60),
          financial_goal: 7000.00,
          current_progress: 2100.00,
          image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]

      await queryInterface.bulkInsert('events', events, {})
    } catch (error) {
      console.error({ seedEventsError: error })
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {})
  }
}
