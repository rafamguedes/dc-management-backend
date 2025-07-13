import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable('aisles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      sectorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sectors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      // Add unique constraint for sectorId and code combination
      return queryInterface.addConstraint('aisles', {
        fields: ['sectorId', 'code'],
        type: 'unique',
        name: 'unique_sector_code'
      });
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('aisles');
  }
};
