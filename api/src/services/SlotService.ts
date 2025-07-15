import SequelizeSlot from '../database/models/SequelizeSlot';
import SequelizeAisle from '../database/models/SequelizeAisle';
import SequelizeSector from '../database/models/SequelizeSector';
import { IResponse } from '../interfaces/IResponse';
import { ISlot, SlotStatus } from '../interfaces/ISlot';

class SlotService {
  private SLOT_NOT_FOUND = 'Slot not found';
  private SLOT_ALREADY_EXISTS = 'Slot with this code already exists in this aisle and floor';
  private AISLE_NOT_FOUND = 'Aisle not found';
  private INVALID_STATUS = 'Invalid status. Must be: available, occupied, or maintenance';
  private ERROR_CREATING_SLOT = 'Failed to create slot, please try again';
  private ERROR_FETCHING_SLOTS = 'Failed to get slots, please try again';
  private ERROR_UPDATING_SLOT = 'Failed to update slot, please try again';
  private ERROR_DELETING_SLOT = 'Failed to delete slot, please try again';

  public async findAll(): Promise<IResponse<ISlot[]>> {
    try {
      const slots = await SequelizeSlot.findAll({
        include: [
          {
            model: SequelizeAisle,
            as: 'aisle',
            attributes: ['id', 'code', 'sectorId'],
            include: [
              {
                model: SequelizeSector,
                as: 'sector',
                attributes: ['id', 'name']
              }
            ]
          }
        ]
      });
      
      if (!slots || slots.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'No slots found' } };
      }

      return { status: 'SUCCESSFUL', data: slots.map(slot => slot.get()) };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SLOTS } };
    }
  }

  public async findById(id: number): Promise<IResponse<ISlot | null>> {
    try {
      const slot = await SequelizeSlot.findByPk(id, {
        include: [
          {
            model: SequelizeAisle,
            as: 'aisle',
            attributes: ['id', 'code', 'sectorId'],
            include: [
              {
                model: SequelizeSector,
                as: 'sector',
                attributes: ['id', 'name']
              }
            ]
          }
        ]
      });
      
      if (!slot) {
        return { status: 'NOT_FOUND', data: { message: this.SLOT_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: slot.get() };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SLOTS } };
    }
  }

  public async findByAisle(aisleId: number): Promise<IResponse<ISlot[]>> {
    try {
      // First check if aisle exists
      const aisle = await SequelizeAisle.findByPk(aisleId);
      if (!aisle) {
        return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
      }

      const slots = await SequelizeSlot.findAll({
        where: { aisleId },
        include: [
          {
            model: SequelizeAisle,
            as: 'aisle',
            attributes: ['id', 'code', 'sectorId'],
            include: [
              {
                model: SequelizeSector,
                as: 'sector',
                attributes: ['id', 'name']
              }
            ]
          }
        ]
      });
      
      if (!slots || slots.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'No slots found for this aisle' } };
      }

      return { status: 'SUCCESSFUL', data: slots.map(slot => slot.get()) };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SLOTS } };
    }
  }

  public async findByStatus(status: SlotStatus): Promise<IResponse<ISlot[]>> {
    try {
      // Validate status
      const validStatuses: SlotStatus[] = ['available', 'occupied', 'maintenance'];
      if (!validStatuses.includes(status)) {
        return { status: 'BAD_REQUEST', data: { message: this.INVALID_STATUS } };
      }

      const slots = await SequelizeSlot.findAll({
        where: { status },
        include: [
          {
            model: SequelizeAisle,
            as: 'aisle',
            attributes: ['id', 'code', 'sectorId'],
            include: [
              {
                model: SequelizeSector,
                as: 'sector',
                attributes: ['id', 'name']
              }
            ]
          }
        ]
      });
      
      if (!slots || slots.length === 0) {
        return { status: 'NOT_FOUND', data: { message: `No slots found with status: ${status}` } };
      }

      return { status: 'SUCCESSFUL', data: slots.map(slot => slot.get()) };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SLOTS } };
    }
  }

  public async findByFloor(floor: number): Promise<IResponse<ISlot[]>> {
    try {
      const slots = await SequelizeSlot.findAll({
        where: { floor },
        include: [
          {
            model: SequelizeAisle,
            as: 'aisle',
            attributes: ['id', 'code', 'sectorId'],
            include: [
              {
                model: SequelizeSector,
                as: 'sector',
                attributes: ['id', 'name']
              }
            ]
          }
        ]
      });
      
      if (!slots || slots.length === 0) {
        return { status: 'NOT_FOUND', data: { message: `No slots found on floor: ${floor}` } };
      }

      return { status: 'SUCCESSFUL', data: slots.map(slot => slot.get()) };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SLOTS } };
    }
  }

  public async create(slotData: { aisleId: number; code: string; floor: number; status?: SlotStatus }): Promise<IResponse<ISlot>> {
    try {
      // Check if aisle exists
      const aisle = await SequelizeAisle.findByPk(slotData.aisleId);
      if (!aisle) {
        return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
      }

      // Validate status if provided
      if (slotData.status) {
        const validStatuses: SlotStatus[] = ['available', 'occupied', 'maintenance'];
        if (!validStatuses.includes(slotData.status)) {
          return { status: 'BAD_REQUEST', data: { message: this.INVALID_STATUS } };
        }
      }

      // Check if slot with same code already exists in this aisle and floor
      const existingSlot = await SequelizeSlot.findOne({
        where: {
          aisleId: slotData.aisleId,
          code: slotData.code,
          floor: slotData.floor
        }
      });

      if (existingSlot) {
        return { status: 'CONFLICT', data: { message: this.SLOT_ALREADY_EXISTS } };
      }

      const dataToCreate = {
        aisleId: slotData.aisleId,
        code: slotData.code,
        floor: slotData.floor,
        status: slotData.status || 'available',
      };
      
      const newSlot = await SequelizeSlot.create(dataToCreate);
      
      if (!newSlot) {
        return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_SLOT } };
      }
      
      // Return the created slot with aisle and sector information
      const slotWithDetails = await SequelizeSlot.findByPk(newSlot.id, {
        include: [
          {
            model: SequelizeAisle,
            as: 'aisle',
            attributes: ['id', 'code', 'sectorId'],
            include: [
              {
                model: SequelizeSector,
                as: 'sector',
                attributes: ['id', 'name']
              }
            ]
          }
        ]
      });
      
      return { status: 'CREATED', data: slotWithDetails!.get() };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_SLOT } };
    }
  }

  public async update(
    id: number, 
    slotData: Partial<{ aisleId: number; code: string; floor: number; status: SlotStatus }>
  ): Promise<IResponse<ISlot | null>> {
    try {
      // If aisleId is being updated, check if the new aisle exists
      if (slotData.aisleId) {
        const aisle = await SequelizeAisle.findByPk(slotData.aisleId);
        if (!aisle) {
          return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
        }
      }

      // Validate status if provided
      if (slotData.status) {
        const validStatuses: SlotStatus[] = ['available', 'occupied', 'maintenance'];
        if (!validStatuses.includes(slotData.status)) {
          return { status: 'BAD_REQUEST', data: { message: this.INVALID_STATUS } };
        }
      }

      // If code, floor, or aisleId is being updated, check for conflicts
      if (slotData.code !== undefined || slotData.floor !== undefined || slotData.aisleId) {
        const currentSlot = await SequelizeSlot.findByPk(id);
        if (!currentSlot) {
          return { status: 'NOT_FOUND', data: { message: this.SLOT_NOT_FOUND } };
        }

        const newAisleId = slotData.aisleId || currentSlot.aisleId;
        const newCode = slotData.code || currentSlot.code;
        const newFloor = slotData.floor || currentSlot.floor;

        const existingSlot = await SequelizeSlot.findOne({
          where: {
            aisleId: newAisleId,
            code: newCode,
            floor: newFloor,
            id: { [require('sequelize').Op.ne]: id } // Exclude current slot
          }
        });

        if (existingSlot) {
          return { status: 'CONFLICT', data: { message: this.SLOT_ALREADY_EXISTS } };
        }
      }

      const [affectedRows] = await SequelizeSlot.update(
        slotData,
        { where: { id } }
      );

      if (affectedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.SLOT_NOT_FOUND } };
      }

      const updatedSlot = await SequelizeSlot.findByPk(id, {
        include: [
          {
            model: SequelizeAisle,
            as: 'aisle',
            attributes: ['id', 'code', 'sectorId'],
            include: [
              {
                model: SequelizeSector,
                as: 'sector',
                attributes: ['id', 'name']
              }
            ]
          }
        ]
      });
      
      return { status: 'SUCCESSFUL', data: updatedSlot?.get() || null };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_SLOT } };
    }
  }

  public async updateStatus(id: number, status: SlotStatus): Promise<IResponse<ISlot | null>> {
    try {
      // Validate status
      const validStatuses: SlotStatus[] = ['available', 'occupied', 'maintenance'];
      if (!validStatuses.includes(status)) {
        return { status: 'BAD_REQUEST', data: { message: this.INVALID_STATUS } };
      }

      const [affectedRows] = await SequelizeSlot.update(
        { status },
        { where: { id } }
      );

      if (affectedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.SLOT_NOT_FOUND } };
      }

      const updatedSlot = await SequelizeSlot.findByPk(id, {
        include: [
          {
            model: SequelizeAisle,
            as: 'aisle',
            attributes: ['id', 'code', 'sectorId'],
            include: [
              {
                model: SequelizeSector,
                as: 'sector',
                attributes: ['id', 'name']
              }
            ]
          }
        ]
      });
      
      return { status: 'SUCCESSFUL', data: updatedSlot?.get() || null };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_SLOT } };
    }
  }

  public async remove(id: number): Promise<IResponse<boolean>> {
    try {
      const deletedRows = await SequelizeSlot.destroy({ where: { id } });
      
      if (deletedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.SLOT_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: true };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_DELETING_SLOT } };
    }
  }
}

export { SlotService };
