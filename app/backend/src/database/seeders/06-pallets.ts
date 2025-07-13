import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    const palletsToInsert = [
      {
        type: 'master',
        slotId: 1,
        qrCode: 'PAL001_MASTER_QR',
        qrCodeSmall: 'PAL001_MASTER_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'single',
        slotId: 2,
        qrCode: 'PAL002_SINGLE_QR',
        qrCodeSmall: 'PAL002_SINGLE_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'master',
        slotId: 3,
        qrCode: 'PAL003_MASTER_QR',
        qrCodeSmall: 'PAL003_MASTER_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'single',
        slotId: 4,
        qrCode: 'PAL004_SINGLE_QR',
        qrCodeSmall: 'PAL004_SINGLE_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'master',
        qrCode: 'PAL005_MASTER_QR',
        qrCodeSmall: 'PAL005_MASTER_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'single',
        qrCode: 'PAL006_SINGLE_QR',
        qrCodeSmall: 'PAL006_SINGLE_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'master',
        qrCode: 'PAL007_MASTER_QR',
        qrCodeSmall: 'PAL007_MASTER_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'single',
        qrCode: 'PAL008_SINGLE_QR',
        qrCodeSmall: 'PAL008_SINGLE_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    try {
      await queryInterface.bulkInsert('pallets', palletsToInsert, {});
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('pallets', {});
  }
};