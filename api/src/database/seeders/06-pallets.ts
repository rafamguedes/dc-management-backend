import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    const palletsToInsert = [
      {
        type: 'master',
        slotId: 1,
        userId: 1,
        productId: 2,
        qrCode: 'PAL001_MASTER_QR',
        qrCodeSmall: 'PAL001_MASTER_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'single',
        slotId: 2,
        userId: 1,
        productId: 1,
        qrCode: 'PAL002_SINGLE_QR',
        qrCodeSmall: 'PAL002_SINGLE_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'master',
        slotId: 3,
        userId: 2,
        productId: 3,
        qrCode: 'PAL003_MASTER_QR',
        qrCodeSmall: 'PAL003_MASTER_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'single',
        slotId: 4,
        userId: 2,
        productId: 4,
        qrCode: 'PAL004_SINGLE_QR',
        qrCodeSmall: 'PAL004_SINGLE_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'master',
        userId: 1,
        productId: 5,
        qrCode: 'PAL005_MASTER_QR',
        qrCodeSmall: 'PAL005_MASTER_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'single',
        userId: 2,
        productId: 6,
        qrCode: 'PAL006_SINGLE_QR',
        qrCodeSmall: 'PAL006_SINGLE_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'master',
        slotId: 5,
        userId: 1,
        qrCode: 'PAL007_MASTER_QR',
        qrCodeSmall: 'PAL007_MASTER_QR_SMALL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'single',
        userId: 2,
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