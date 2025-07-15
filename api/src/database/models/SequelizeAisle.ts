import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import db from '.';
import SequelizeSector from './SequelizeSector';

class SequelizeAisle extends Model<InferAttributes<SequelizeAisle>,
InferCreationAttributes<SequelizeAisle>> {
  declare id: CreationOptional<number>;

  declare sectorId: ForeignKey<number>;

  declare code: string;

  declare description: string | null;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

SequelizeAisle.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  sectorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SequelizeSector,
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
}, {
  sequelize: db,
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
SequelizeAisle.belongsTo(SequelizeSector, {
  foreignKey: 'sectorId',
  as: 'sector'
});

SequelizeSector.hasMany(SequelizeAisle, {
  foreignKey: 'sectorId',
  as: 'aisles'
});

export default SequelizeAisle;
