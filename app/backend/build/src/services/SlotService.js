"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotService = void 0;
const SequelizeSlot_1 = require("../database/models/SequelizeSlot");
const SequelizeAisle_1 = require("../database/models/SequelizeAisle");
const SequelizeSector_1 = require("../database/models/SequelizeSector");
class SlotService {
    constructor() {
        this.SLOT_NOT_FOUND = 'Slot not found';
        this.SLOT_ALREADY_EXISTS = 'Slot with this code already exists in this aisle and floor';
        this.AISLE_NOT_FOUND = 'Aisle not found';
        this.INVALID_STATUS = 'Invalid status. Must be: available, occupied, or maintenance';
        this.ERROR_CREATING_SLOT = 'Failed to create slot, please try again';
        this.ERROR_FETCHING_SLOTS = 'Failed to get slots, please try again';
        this.ERROR_UPDATING_SLOT = 'Failed to update slot, please try again';
        this.ERROR_DELETING_SLOT = 'Failed to delete slot, please try again';
    }
    async findAll() {
        try {
            const slots = await SequelizeSlot_1.default.findAll({
                include: [
                    {
                        model: SequelizeAisle_1.default,
                        as: 'aisle',
                        attributes: ['id', 'code', 'sectorId'],
                        include: [
                            {
                                model: SequelizeSector_1.default,
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
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SLOTS } };
        }
    }
    async findById(id) {
        try {
            const slot = await SequelizeSlot_1.default.findByPk(id, {
                include: [
                    {
                        model: SequelizeAisle_1.default,
                        as: 'aisle',
                        attributes: ['id', 'code', 'sectorId'],
                        include: [
                            {
                                model: SequelizeSector_1.default,
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
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SLOTS } };
        }
    }
    async findByAisle(aisleId) {
        try {
            // First check if aisle exists
            const aisle = await SequelizeAisle_1.default.findByPk(aisleId);
            if (!aisle) {
                return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
            }
            const slots = await SequelizeSlot_1.default.findAll({
                where: { aisleId },
                include: [
                    {
                        model: SequelizeAisle_1.default,
                        as: 'aisle',
                        attributes: ['id', 'code', 'sectorId'],
                        include: [
                            {
                                model: SequelizeSector_1.default,
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
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SLOTS } };
        }
    }
    async findByStatus(status) {
        try {
            // Validate status
            const validStatuses = ['available', 'occupied', 'maintenance'];
            if (!validStatuses.includes(status)) {
                return { status: 'BAD_REQUEST', data: { message: this.INVALID_STATUS } };
            }
            const slots = await SequelizeSlot_1.default.findAll({
                where: { status },
                include: [
                    {
                        model: SequelizeAisle_1.default,
                        as: 'aisle',
                        attributes: ['id', 'code', 'sectorId'],
                        include: [
                            {
                                model: SequelizeSector_1.default,
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
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SLOTS } };
        }
    }
    async findByFloor(floor) {
        try {
            const slots = await SequelizeSlot_1.default.findAll({
                where: { floor },
                include: [
                    {
                        model: SequelizeAisle_1.default,
                        as: 'aisle',
                        attributes: ['id', 'code', 'sectorId'],
                        include: [
                            {
                                model: SequelizeSector_1.default,
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
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SLOTS } };
        }
    }
    async create(slotData) {
        try {
            // Check if aisle exists
            const aisle = await SequelizeAisle_1.default.findByPk(slotData.aisleId);
            if (!aisle) {
                return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
            }
            // Validate status if provided
            if (slotData.status) {
                const validStatuses = ['available', 'occupied', 'maintenance'];
                if (!validStatuses.includes(slotData.status)) {
                    return { status: 'BAD_REQUEST', data: { message: this.INVALID_STATUS } };
                }
            }
            // Check if slot with same code already exists in this aisle and floor
            const existingSlot = await SequelizeSlot_1.default.findOne({
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
            const newSlot = await SequelizeSlot_1.default.create(dataToCreate);
            if (!newSlot) {
                return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_SLOT } };
            }
            // Return the created slot with aisle and sector information
            const slotWithDetails = await SequelizeSlot_1.default.findByPk(newSlot.id, {
                include: [
                    {
                        model: SequelizeAisle_1.default,
                        as: 'aisle',
                        attributes: ['id', 'code', 'sectorId'],
                        include: [
                            {
                                model: SequelizeSector_1.default,
                                as: 'sector',
                                attributes: ['id', 'name']
                            }
                        ]
                    }
                ]
            });
            return { status: 'CREATED', data: slotWithDetails.get() };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_SLOT } };
        }
    }
    async update(id, slotData) {
        try {
            // If aisleId is being updated, check if the new aisle exists
            if (slotData.aisleId) {
                const aisle = await SequelizeAisle_1.default.findByPk(slotData.aisleId);
                if (!aisle) {
                    return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
                }
            }
            // Validate status if provided
            if (slotData.status) {
                const validStatuses = ['available', 'occupied', 'maintenance'];
                if (!validStatuses.includes(slotData.status)) {
                    return { status: 'BAD_REQUEST', data: { message: this.INVALID_STATUS } };
                }
            }
            // If code, floor, or aisleId is being updated, check for conflicts
            if (slotData.code !== undefined || slotData.floor !== undefined || slotData.aisleId) {
                const currentSlot = await SequelizeSlot_1.default.findByPk(id);
                if (!currentSlot) {
                    return { status: 'NOT_FOUND', data: { message: this.SLOT_NOT_FOUND } };
                }
                const newAisleId = slotData.aisleId || currentSlot.aisleId;
                const newCode = slotData.code || currentSlot.code;
                const newFloor = slotData.floor || currentSlot.floor;
                const existingSlot = await SequelizeSlot_1.default.findOne({
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
            const [affectedRows] = await SequelizeSlot_1.default.update(slotData, { where: { id } });
            if (affectedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.SLOT_NOT_FOUND } };
            }
            const updatedSlot = await SequelizeSlot_1.default.findByPk(id, {
                include: [
                    {
                        model: SequelizeAisle_1.default,
                        as: 'aisle',
                        attributes: ['id', 'code', 'sectorId'],
                        include: [
                            {
                                model: SequelizeSector_1.default,
                                as: 'sector',
                                attributes: ['id', 'name']
                            }
                        ]
                    }
                ]
            });
            return { status: 'SUCCESSFUL', data: (updatedSlot === null || updatedSlot === void 0 ? void 0 : updatedSlot.get()) || null };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_SLOT } };
        }
    }
    async updateStatus(id, status) {
        try {
            // Validate status
            const validStatuses = ['available', 'occupied', 'maintenance'];
            if (!validStatuses.includes(status)) {
                return { status: 'BAD_REQUEST', data: { message: this.INVALID_STATUS } };
            }
            const [affectedRows] = await SequelizeSlot_1.default.update({ status }, { where: { id } });
            if (affectedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.SLOT_NOT_FOUND } };
            }
            const updatedSlot = await SequelizeSlot_1.default.findByPk(id, {
                include: [
                    {
                        model: SequelizeAisle_1.default,
                        as: 'aisle',
                        attributes: ['id', 'code', 'sectorId'],
                        include: [
                            {
                                model: SequelizeSector_1.default,
                                as: 'sector',
                                attributes: ['id', 'name']
                            }
                        ]
                    }
                ]
            });
            return { status: 'SUCCESSFUL', data: (updatedSlot === null || updatedSlot === void 0 ? void 0 : updatedSlot.get()) || null };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_SLOT } };
        }
    }
    async remove(id) {
        try {
            const deletedRows = await SequelizeSlot_1.default.destroy({ where: { id } });
            if (deletedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.SLOT_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: true };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_DELETING_SLOT } };
        }
    }
}
exports.SlotService = SlotService;
//# sourceMappingURL=SlotService.js.map