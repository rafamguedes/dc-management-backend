import * as axios from 'axios';
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    let characters = [] as any[];
    let nextUrl = 'https://rickandmortyapi.com/api/character/';

    while (nextUrl) {
      const response = await axios.default.get(nextUrl);
      characters = characters.concat(response.data.results);
      nextUrl = response.data.info.next;
    }

    const charactersToInsert = characters.map((character: any) => {
      let role;
      
      if (character.name === 'Rick Sanchez') {
        role = 'admin';
      } else {
        role = 'user';
      }

      return {
        username: character.name,
        role,
        email: `${character.name.toLowerCase().replace(/\s/g, '')}@email.com`,
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        image: character.image,
      };
    }).filter(Boolean);

    try {
      await queryInterface.bulkInsert('users', charactersToInsert, {});
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  }
};