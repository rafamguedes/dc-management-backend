import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Rick Sanchez',
        role: 'admin',
        email: 'rick@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', // secret_admin
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
      },
      {
        username: 'Morty Smith',
        role: 'user',
        email: 'morty@euser.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
      },
      {
        username: 'Beth Smith',
        role: 'user',
        email: 'beth@email.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg'
      },
      {
        username: 'Agency Director',
        role: 'user',
        email: 'director@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
        image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg'
      },
      {
        username: 'Jerry Smith',
        role: 'user',
        email: 'jerrysmith@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
        image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg'
      },
      {
        username: 'Amish Cyborg',
        role: 'user',
        email: 'amish@user.com',
        password: '$2a$10$HDkFwOMKOI6PTza0F7.YRu1Bqsqb9hx7XkuV7QeYB5dRL4z9DI1Mu',
        image: 'https://rickandmortyapi.com/api/character/avatar/16.jpeg'
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
}