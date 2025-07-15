"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('aisles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER
            },
            sectorId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'sectors',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            code: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
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
        }).then(() => {
            // Add unique constraint for sectorId and code combination
            return queryInterface.addConstraint('aisles', {
                fields: ['sectorId', 'code'],
                type: 'unique',
                name: 'unique_sector_code'
            });
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('aisles');
    }
};
//# sourceMappingURL=03-aisles.js.map