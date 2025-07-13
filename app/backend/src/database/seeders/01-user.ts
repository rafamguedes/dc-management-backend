import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    const usersToInsert = [
      {
        username: 'Admin User',
        role: 'admin',
        email: 'admin@email.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
      {
        username: 'Regular User',
        role: 'user',
        email: 'user@email.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      }
    ];

    try {
      await queryInterface.bulkInsert('users', usersToInsert, {});
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  }
};