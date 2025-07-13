"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const SequelizeAisle_1 = require("./SequelizeAisle");
class SequelizeSlot extends sequelize_1.Model {
}
SequelizeSlot.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    aisleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SequelizeAisle_1.default,
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
        validate: {
            isIn: [['available', 'occupied', 'maintenance']]
        }
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
}, {
    sequelize: _1.default,
    modelName: 'Slot',
    tableName: 'slots',
    underscored: false,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['aisleId', 'code', 'floor'],
            name: 'unique_aisle_code_floor'
        }
    ]
});
// Define associations
SequelizeSlot.belongsTo(SequelizeAisle_1.default, {
    foreignKey: 'aisleId',
    as: 'aisle'
});
SequelizeAisle_1.default.hasMany(SequelizeSlot, {
    foreignKey: 'aisleId',
    as: 'slots'
});
exports.default = SequelizeSlot;
//# sourceMappingURL=SequelizeSlot.js.map