import SequelizeAisle from '../database/models/SequelizeAisle';
import SequelizeSector from '../database/models/SequelizeSector';
import { IResponse } from '../interfaces/IResponse';
import { IAisle } from '../interfaces/IAisle';

class AisleService {
  private AISLE_NOT_FOUND = 'Aisle not found';
  private AISLE_ALREADY_EXISTS = 'Aisle with this code already exists in this sector';
  private SECTOR_NOT_FOUND = 'Sector not found';
  private ERROR_CREATING_AISLE = 'Failed to create aisle, please try again';
  private ERROR_FETCHING_AISLES = 'Failed to get aisles, please try again';
  private ERROR_UPDATING_AISLE = 'Failed to update aisle, please try again';
  private ERROR_DELETING_AISLE = 'Failed to delete aisle, please try again';

  public async findAll(): Promise<IResponse<IAisle[]>> {
    try {
      const aisles = await SequelizeAisle.findAll({
        include: [
          {
            model: SequelizeSector,
            as: 'sector',
            attributes: ['id', 'name']
          }
        ]
      });
      
      if (!aisles || aisles.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'No aisles found' } };
      }

      return { status: 'SUCCESSFUL', data: aisles.map(aisle => aisle.get()) };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_AISLES } };
    }
  }

  public async findById(id: number): Promise<IResponse<IAisle | null>> {
    try {
      const aisle = await SequelizeAisle.findByPk(id, {
        include: [
          {
            model: SequelizeSector,
            as: 'sector',
            attributes: ['id', 'name']
          }
        ]
      });
      
      if (!aisle) {
        return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: aisle.get() };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_AISLES } };
    }
  }

  public async findBySector(sectorId: number): Promise<IResponse<IAisle[]>> {
    try {
      const sector = await SequelizeSector.findByPk(sectorId);
      if (!sector) {
        return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
      }

      const aisles = await SequelizeAisle.findAll({
        where: { sectorId },
        include: [
          {
            model: SequelizeSector,
            as: 'sector',
            attributes: ['id', 'name']
          }
        ]
      });
      
      if (!aisles || aisles.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'No aisles found for this sector' } };
      }

      return { status: 'SUCCESSFUL', data: aisles.map(aisle => aisle.get()) };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_AISLES } };
    }
  }

  public async create(aisleData: { sectorId: number; code: string; description?: string }): Promise<IResponse<IAisle>> {
    try {
      const sector = await SequelizeSector.findByPk(aisleData.sectorId);
      if (!sector) {
        return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
      }

      const existingAisle = await SequelizeAisle.findOne({
        where: {
          sectorId: aisleData.sectorId,
          code: aisleData.code
        }
      });

      if (existingAisle) {
        return { status: 'CONFLICT', data: { message: this.AISLE_ALREADY_EXISTS } };
      }

      const dataToCreate = {
        sectorId: aisleData.sectorId,
        code: aisleData.code,
        description: aisleData.description || '',
      };
      
      const newAisle = await SequelizeAisle.create(dataToCreate);
      
      if (!newAisle) {
        return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_AISLE } };
      }
      
      const aisleWithSector = await SequelizeAisle.findByPk(newAisle.id, {
        include: [
          {
            model: SequelizeSector,
            as: 'sector',
            attributes: ['id', 'name']
          }
        ]
      });
      
      return { status: 'CREATED', data: aisleWithSector!.get() };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_AISLE } };
    }
  }

  public async update(
    id: number, 
    aisleData: Partial<{ sectorId: number; code: string; description?: string }>
  ): Promise<IResponse<IAisle | null>> {
    try {
      if (aisleData.sectorId) {
        const sector = await SequelizeSector.findByPk(aisleData.sectorId);
        if (!sector) {
          return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
        }
      }

      if (aisleData.code || aisleData.sectorId) {
        const currentAisle = await SequelizeAisle.findByPk(id);
        if (!currentAisle) {
          return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
        }

        const newSectorId = aisleData.sectorId || currentAisle.sectorId;
        const newCode = aisleData.code || currentAisle.code;

        const existingAisle = await SequelizeAisle.findOne({
          where: {
            sectorId: newSectorId,
            code: newCode,
            id: { [require('sequelize').Op.ne]: id } // Exclude current aisle from conflict check
          }
        });

        if (existingAisle) {
          return { status: 'CONFLICT', data: { message: this.AISLE_ALREADY_EXISTS } };
        }
      }

      const [affectedRows] = await SequelizeAisle.update(
        aisleData,
        { where: { id } }
      );

      if (affectedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
      }

      const updatedAisle = await SequelizeAisle.findByPk(id, {
        include: [
          {
            model: SequelizeSector,
            as: 'sector',
            attributes: ['id', 'name']
          }
        ]
      });
      
      return { status: 'SUCCESSFUL', data: updatedAisle?.get() || null };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_AISLE } };
    }
  }

  public async remove(id: number): Promise<IResponse<boolean>> {
    try {
      const deletedRows = await SequelizeAisle.destroy({ where: { id } });
      
      if (deletedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: true };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_DELETING_AISLE } };
    }
  }
}

export { AisleService };
