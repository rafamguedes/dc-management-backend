"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('pallet_products', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            palletId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'pallets',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            productId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            quantity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                },
            },
            expiryDate: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true,
            },
            manufactureDate: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
        // Add unique constraint to prevent duplicate pallet-product combinations
        await queryInterface.addConstraint('pallet_products', {
            fields: ['palletId', 'productId'],
            type: 'unique',
            name: 'unique_pallet_product',
        });
        // Add indexes for better query performance
        await queryInterface.addIndex('pallet_products', ['palletId'], {
            name: 'idx_pallet_products_pallet_id',
        });
        await queryInterface.addIndex('pallet_products', ['productId'], {
            name: 'idx_pallet_products_product_id',
        });
        await queryInterface.addIndex('pallet_products', ['expiryDate'], {
            name: 'idx_pallet_products_expiry_date',
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('pallet_products');
    },
};
//# sourceMappingURL=07-palletProducts.js.map