import { 
  DataTypes, 
  Model, 
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey
} from 'sequelize';
import db from '.';

type PalletType = 'master' | 'single';

class SequelizePallet extends Model<InferAttributes<SequelizePallet>,
InferCreationAttributes<SequelizePallet>> {
  declare id: CreationOptional<number>;
  declare type: PalletType;
  declare slotId: ForeignKey<number> | null;
  declare qrCode: string;
  declare qrCodeSmall: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SequelizePallet.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('master', 'single'),
    allowNull: false,
  },
  slotId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Slots',
      key: 'id',
    },
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
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Pallet',
  tableName: 'pallets',
  timestamps: true,
  underscored: false,
});

export default SequelizePallet;
