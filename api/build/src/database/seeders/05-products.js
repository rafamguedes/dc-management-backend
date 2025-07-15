"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: async (queryInterface) => {
        const productsToInsert = [
            {
                code: 'P001',
                name: 'Laptop',
                description: 'High-performance laptop for professionals',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P002',
                name: 'Smartphone',
                description: 'Latest model smartphone with advanced features',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P003',
                name: 'Headphones',
                description: 'Noise-cancelling over-ear headphones',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P004',
                name: 'Smartwatch',
                description: 'Smartwatch with fitness tracking capabilities',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P005',
                name: 'Tablet',
                description: 'Portable tablet with high-resolution display',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P006',
                name: 'Wireless Mouse',
                description: 'Ergonomic wireless mouse for comfortable use',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P007',
                name: 'Bluetooth Speaker',
                description: 'Compact Bluetooth speaker with powerful sound',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P008',
                name: 'External Hard Drive',
                description: '1TB external hard drive for data storage',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P009',
                name: 'Gaming Keyboard',
                description: 'Mechanical gaming keyboard with customizable keys',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P010',
                name: 'Webcam',
                description: 'HD webcam for video conferencing',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P011',
                name: 'Portable Charger',
                description: 'High-capacity portable charger for devices',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P012',
                name: 'USB-C Hub',
                description: 'Multi-port USB-C hub for connectivity',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P013',
                name: 'Smart Home Hub',
                description: 'Central hub for smart home devices',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P014',
                name: 'VR Headset',
                description: 'Virtual reality headset for immersive experiences',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P015',
                name: 'Action Camera',
                description: 'Compact action camera for adventure filming',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                code: 'P016',
                name: 'E-Reader',
                description: 'E-reader with high-resolution display for reading',
                unit: 'pcs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        try {
            await queryInterface.bulkInsert('products', productsToInsert, {});
        }
        catch (error) {
            console.error(error);
        }
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('products', {});
    }
};
//# sourceMappingURL=05-products.js.map