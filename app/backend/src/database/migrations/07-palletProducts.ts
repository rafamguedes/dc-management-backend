import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('pallet_products', {
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
          min: 1,
        },
      },
      expiryDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      manufactureDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
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

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('pallet_products');
  },
};
