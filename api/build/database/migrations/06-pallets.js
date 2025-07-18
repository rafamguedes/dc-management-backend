"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: async (queryInterface) => {
        // Create enum type for PostgreSQL
        await queryInterface.sequelize.query('CREATE TYPE "enum_pallets_type" AS ENUM (\'master\', \'single\');');
        await queryInterface.createTable('pallets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER
            },
            type: {
                type: sequelize_1.DataTypes.ENUM('master', 'single'),
                allowNull: false,
            },
            slotId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'slots',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            productId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'products',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            qrCode: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            qrCodeSmall: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('pallets');
        await queryInterface.sequelize.query('DROP TYPE "enum_pallets_type";');
    }
};
//# sourceMappingURL=06-pallets.js.map