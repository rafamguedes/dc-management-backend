import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import db from './Models';
import SequelizeAisle from './SequelizeAisle';

type SlotStatus = 'available' | 'occupied' | 'maintenance';

class SequelizeSlot extends Model<InferAttributes<SequelizeSlot>,
InferCreationAttributes<SequelizeSlot>> {
  declare id: CreationOptional<number>;

  declare aisleId: ForeignKey<number>;

  declare code: string;

  declare floor: number;

  declare status: SlotStatus;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

SequelizeSlot.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  aisleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SequelizeAisle,
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
    validate: {
      isIn: [['available', 'occupied', 'maintenance']]
    }
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
  modelName: 'slots',
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
SequelizeSlot.belongsTo(SequelizeAisle, {
  foreignKey: 'aisleId',
  as: 'aisle'
});

SequelizeAisle.hasMany(SequelizeSlot, {
  foreignKey: 'aisleId',
  as: 'slots'
});

export default SequelizeSlot;
