import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable('slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      aisleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'aisles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'available',
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
    }).then(() => {
      // Add unique constraint for aisleId, code, and floor combination
      return queryInterface.addConstraint('slots', {
        fields: ['aisleId', 'code', 'floor'],
        type: 'unique',
        name: 'unique_aisle_code_floor'
      });
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('slots');
  }
};
