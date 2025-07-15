import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    const sectorsToInsert = [
      {
        name: 'Technology',
        description: 'Information Technology and Software Development sector',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Finance',
        description: 'Banking, Investment and Financial Services sector',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Healthcare',
        description: 'Medical, Pharmaceutical and Healthcare Services sector',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Education',
        description: 'Educational Institutions and Training Services sector',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Manufacturing',
        description: 'Industrial Production and Manufacturing sector',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    try {
      await queryInterface.bulkInsert('sectors', sectorsToInsert, {});
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('sectors', {});
  }
};
