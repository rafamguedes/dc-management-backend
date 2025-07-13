import SequelizeSector from '../database/models/SequelizeSector';
import { IResponse } from '../interfaces/IResponse';
import { ISector } from '../interfaces/ISector';

export class SectorService {
  private SECTOR_NOT_FOUND = 'Sector not found';
  private SECTOR_ALREADY_EXISTS = 'Sector already exists, please try a different name';
  private ERROR_CREATING_SECTOR = 'Failed to create sector, please try again';
  private ERROR_FETCHING_SECTORS = 'Failed to get sectors, please try again';
  private ERROR_UPDATING_SECTOR = 'Failed to update sector, please try again';
  private ERROR_DELETING_SECTOR = 'Failed to delete sector, please try again';

  public async findAll(): Promise<IResponse<ISector[]>> {
    try {
      const sectors = await SequelizeSector.findAll();
      
      if (!sectors || sectors.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'No sectors found' } };
      }

      return { status: 'SUCCESSFUL', data: sectors };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SECTORS } };
    }
  }

  public async findById(id: number): Promise<IResponse<ISector | null>> {
    try {
      const sector = await SequelizeSector.findByPk(id);
      
      if (!sector) {
        return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: sector };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SECTORS } };
    }
  }

  public async create(sectorData: { name: string; description?: string }): Promise<IResponse<ISector>> {
    try {
      const existingSector = await SequelizeSector.findOne({ where: { name: sectorData.name } });

      if (existingSector) {
        return { status: 'CONFLICT', data: { message: this.SECTOR_ALREADY_EXISTS } };
      }

      const dataToCreate = {
        name: sectorData.name,
        description: sectorData.description || '',
      };
      
      const newSector = await SequelizeSector.create(dataToCreate);
      
      if (!newSector) {
        return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_SECTOR } };
      }
      
      return { status: 'CREATED', data: newSector.get() };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_SECTOR } };
    }
  }

  public async update(
    id: number, 
    sectorData: Partial<{ name: string; description?: string }>
  ): Promise<IResponse<ISector | null>> {
    try {
      const [affectedRows] = await SequelizeSector.update(
        sectorData,
        { where: { id } }
      );

      if (affectedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
      }

      const updatedSector = await SequelizeSector.findByPk(id);
      return { status: 'SUCCESSFUL', data: updatedSector };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_SECTOR } };
    }
  }

  public async remove(id: number): Promise<IResponse<boolean>> {
    try {
      const deletedRows = await SequelizeSector.destroy({ where: { id } });
      
      if (deletedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: true };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_DELETING_SECTOR } };
    }
  }
}