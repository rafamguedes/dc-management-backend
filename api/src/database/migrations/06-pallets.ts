import { QueryInterface, DataTypes } from 'sequelize';
export default {
  up: async (queryInterface: QueryInterface) => {
    // Create enum type for PostgreSQL
    await queryInterface.sequelize.query('CREATE TYPE "enum_pallets_type" AS ENUM (\'master\', \'single\');');
    
    await queryInterface.createTable('pallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.ENUM('master', 'single'),
        allowNull: false,
      },
      slotId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'slots',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      qrCode: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      qrCodeSmall: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('pallets');
    await queryInterface.sequelize.query('DROP TYPE "enum_pallets_type";');
  }
};