"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface) => {
        const palletProducts = [
            {
                palletId: 1,
                productId: 1,
                quantity: 50,
                expiryDate: '2024-12-31',
                manufactureDate: '2024-01-15',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                palletId: 1,
                productId: 2,
                quantity: 30,
                expiryDate: '2025-06-30',
                manufactureDate: '2024-02-10',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                palletId: 2,
                productId: 3,
                quantity: 75,
                expiryDate: '2024-11-15',
                manufactureDate: '2024-01-20',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                palletId: 2,
                productId: 4,
                quantity: 25,
                expiryDate: '2025-03-31',
                manufactureDate: '2024-03-01',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                palletId: 3,
                productId: 1,
                quantity: 100,
                expiryDate: '2025-01-31',
                manufactureDate: '2024-02-15',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                palletId: 3,
                productId: 5,
                quantity: 40,
                expiryDate: '2024-10-31',
                manufactureDate: '2024-01-10',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                palletId: 4,
                productId: 2,
                quantity: 60,
                expiryDate: '2025-08-15',
                manufactureDate: '2024-04-01',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                palletId: 4,
                productId: 6,
                quantity: 35,
                expiryDate: '2024-09-30',
                manufactureDate: '2024-01-05',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                palletId: 5,
                productId: 7,
                quantity: 80,
                expiryDate: '2025-04-30',
                manufactureDate: '2024-03-15',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                palletId: 5,
                productId: 8,
                quantity: 45,
                expiryDate: '2024-12-15',
                manufactureDate: '2024-02-20',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        await queryInterface.bulkInsert('pallet_products', palletProducts);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('pallet_products', {});
    },
};
//# sourceMappingURL=07-palletProducts.js.map