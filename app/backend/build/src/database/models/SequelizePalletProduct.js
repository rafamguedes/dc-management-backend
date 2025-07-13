"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class SequelizePalletProduct extends sequelize_1.Model {
    static associate(models) {
        // Define associations
        SequelizePalletProduct.belongsTo(models.SequelizePallet, {
            foreignKey: 'palletId',
            as: 'pallet',
        });
        SequelizePalletProduct.belongsTo(models.SequelizeProduct, {
            foreignKey: 'productId',
            as: 'product',
        });
    }
}
SequelizePalletProduct.init({
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
            min: {
                args: [1],
                msg: 'Quantity must be at least 1',
            },
        },
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true,
            isAfterManufacture(value) {
                if (value && this.manufactureDate && new Date(value) <= new Date(this.manufactureDate)) {
                    throw new Error('Expiry date must be after manufacture date');
                }
            },
        },
    },
    manufactureDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true,
            isNotFuture(value) {
                if (value && new Date(value) > new Date()) {
                    throw new Error('Manufacture date cannot be in the future');
                }
            },
        },
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
}, {
    sequelize: _1.default,
    tableName: 'pallet_products',
    modelName: 'PalletProduct',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['palletId', 'productId'],
            name: 'unique_pallet_product',
        },
        {
            fields: ['palletId'],
            name: 'idx_pallet_products_pallet_id',
        },
        {
            fields: ['productId'],
            name: 'idx_pallet_products_product_id',
        },
        {
            fields: ['expiryDate'],
            name: 'idx_pallet_products_expiry_date',
        },
    ],
});
exports.default = SequelizePalletProduct;
//# sourceMappingURL=SequelizePalletProduct.js.map