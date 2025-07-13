"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const SequelizeSector_1 = require("./SequelizeSector");
class SequelizeAisle extends sequelize_1.Model {
}
SequelizeAisle.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    sectorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SequelizeSector_1.default,
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
}, {
    sequelize: _1.default,
    modelName: 'Aisle',
    tableName: 'aisles',
    underscored: false,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['sectorId', 'code'],
            name: 'unique_sector_code'
        }
    ]
});
// Define associations
SequelizeAisle.belongsTo(SequelizeSector_1.default, {
    foreignKey: 'sectorId',
    as: 'sector'
});
SequelizeSector_1.default.hasMany(SequelizeAisle, {
    foreignKey: 'sectorId',
    as: 'aisles'
});
exports.default = SequelizeAisle;
//# sourceMappingURL=SequelizeAisle.js.map