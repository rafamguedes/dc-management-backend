import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';
import { IPalletProduct } from '../../interfaces/IPalletProduct';

interface PalletProductCreationAttributes extends Optional<IPalletProduct, 'id' | 'createdAt' | 'updatedAt'> {}

class SequelizePalletProduct extends Model<IPalletProduct, PalletProductCreationAttributes> implements IPalletProduct {
  public id!: number;
  public palletId!: number;
  public productId!: number;
  public quantity!: number;
  public expiryDate?: string;
  public manufactureDate?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
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

SequelizePalletProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    palletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pallets',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Quantity must be at least 1',
        },
      },
    },
    expiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true,
        isAfterManufacture(value: string) {
          if (value && this.manufactureDate && new Date(value) <= new Date(this.manufactureDate as string)) {
            throw new Error('Expiry date must be after manufacture date');
          }
        },
      },
    },
    manufactureDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true,
        isNotFuture(value: string) {
          if (value && new Date(value) > new Date()) {
            throw new Error('Manufacture date cannot be in the future');
          }
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
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
  }
);

export default SequelizePalletProduct;
