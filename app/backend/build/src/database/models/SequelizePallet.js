"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class SequelizePallet extends sequelize_1.Model {
}
SequelizePallet.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('master', 'single'),
        allowNull: false,
    },
    slotId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Slots',
            key: 'id',
        },
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Products',
            key: 'id',
        },
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
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    modelName: 'Pallet',
    tableName: 'pallets',
    timestamps: true,
    underscored: false,
});
exports.default = SequelizePallet;
//# sourceMappingURL=SequelizePallet.js.map