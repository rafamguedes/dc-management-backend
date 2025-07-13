"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: async (queryInterface) => {
        const slotsToInsert = [
            // Technology Sector Aisles Slots (aisleId 1-3)
            // Aisle A01 - Software Development Tools
            {
                aisleId: 1,
                code: 'S01',
                floor: 1,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 1,
                code: 'S02',
                floor: 1,
                status: 'occupied',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 1,
                code: 'S01',
                floor: 2,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 1,
                code: 'S02',
                floor: 2,
                status: 'maintenance',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Aisle A02 - Hardware Components
            {
                aisleId: 2,
                code: 'H01',
                floor: 1,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 2,
                code: 'H02',
                floor: 1,
                status: 'occupied',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 2,
                code: 'H03',
                floor: 1,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Aisle A03 - Network Equipment
            {
                aisleId: 3,
                code: 'N01',
                floor: 1,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 3,
                code: 'N02',
                floor: 1,
                status: 'occupied',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Finance Sector Aisles Slots (aisleId 4-6)
            // Aisle B01 - Investment Banking
            {
                aisleId: 4,
                code: 'I01',
                floor: 1,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 4,
                code: 'I02',
                floor: 1,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Aisle B02 - Retail Banking
            {
                aisleId: 5,
                code: 'R01',
                floor: 1,
                status: 'occupied',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 5,
                code: 'R02',
                floor: 1,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 5,
                code: 'R01',
                floor: 2,
                status: 'maintenance',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Healthcare Sector Aisles Slots (aisleId 7-9)
            // Aisle C01 - Emergency Medical
            {
                aisleId: 7,
                code: 'E01',
                floor: 1,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 7,
                code: 'E02',
                floor: 1,
                status: 'occupied',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Aisle C02 - Pharmaceutical
            {
                aisleId: 8,
                code: 'P01',
                floor: 1,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 8,
                code: 'P02',
                floor: 1,
                status: 'available',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                aisleId: 8,
                code: 'P03',
                floor: 1,
                status: 'maintenance',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];
        try {
            await queryInterface.bulkInsert('slots', slotsToInsert, {});
        }
        catch (error) {
            console.error(error);
        }
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('slots', {});
    }
};
//# sourceMappingURL=04-slots.js.map