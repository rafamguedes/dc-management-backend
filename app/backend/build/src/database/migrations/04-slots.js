"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('slots', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER
            },
            aisleId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'aisles',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            code: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
            },
            floor: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
                defaultValue: 'available',
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
            // Add unique constraint for aisleId, code, and floor combination
            return queryInterface.addConstraint('slots', {
                fields: ['aisleId', 'code', 'floor'],
                type: 'unique',
                name: 'unique_aisle_code_floor'
            });
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('slots');
    }
};
//# sourceMappingURL=04-slots.js.map