import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    const aislesToInsert = [
      // Technology Sector Aisles (assuming sectorId 1)
      {
        sectorId: 1,
        code: 'A01',
        description: 'Software Development Tools and IDEs',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectorId: 1,
        code: 'A02',
        description: 'Hardware Components and Servers',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectorId: 1,
        code: 'A03',
        description: 'Network Equipment and Infrastructure',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Finance Sector Aisles (assuming sectorId 2)
      {
        sectorId: 2,
        code: 'B01',
        description: 'Investment Banking Services',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectorId: 2,
        code: 'B02',
        description: 'Retail Banking Operations',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectorId: 2,
        code: 'B03',
        description: 'Risk Management and Compliance',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Healthcare Sector Aisles (assuming sectorId 3)
      {
        sectorId: 3,
        code: 'C01',
        description: 'Emergency Medical Services',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectorId: 3,
        code: 'C02',
        description: 'Pharmaceutical Research',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectorId: 3,
        code: 'C03',
        description: 'Patient Care and Treatment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Education Sector Aisles (assuming sectorId 4)
      {
        sectorId: 4,
        code: 'D01',
        description: 'Primary Education Programs',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectorId: 4,
        code: 'D02',
        description: 'Higher Education and Research',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Manufacturing Sector Aisles (assuming sectorId 5)
      {
        sectorId: 5,
        code: 'E01',
        description: 'Production Line Assembly',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectorId: 5,
        code: 'E02',
        description: 'Quality Control and Testing',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    try {
      await queryInterface.bulkInsert('aisles', aislesToInsert, {});
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('aisles', {});
  }
};
