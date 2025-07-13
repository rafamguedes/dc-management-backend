"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AisleService = void 0;
const SequelizeAisle_1 = require("../database/models/SequelizeAisle");
const SequelizeSector_1 = require("../database/models/SequelizeSector");
class AisleService {
    constructor() {
        this.AISLE_NOT_FOUND = 'Aisle not found';
        this.AISLE_ALREADY_EXISTS = 'Aisle with this code already exists in this sector';
        this.SECTOR_NOT_FOUND = 'Sector not found';
        this.ERROR_CREATING_AISLE = 'Failed to create aisle, please try again';
        this.ERROR_FETCHING_AISLES = 'Failed to get aisles, please try again';
        this.ERROR_UPDATING_AISLE = 'Failed to update aisle, please try again';
        this.ERROR_DELETING_AISLE = 'Failed to delete aisle, please try again';
    }
    async findAll() {
        try {
            const aisles = await SequelizeAisle_1.default.findAll({
                include: [
                    {
                        model: SequelizeSector_1.default,
                        as: 'sector',
                        attributes: ['id', 'name']
                    }
                ]
            });
            if (!aisles || aisles.length === 0) {
                return { status: 'NOT_FOUND', data: { message: 'No aisles found' } };
            }
            return { status: 'SUCCESSFUL', data: aisles.map(aisle => aisle.get()) };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_AISLES } };
        }
    }
    async findById(id) {
        try {
            const aisle = await SequelizeAisle_1.default.findByPk(id, {
                include: [
                    {
                        model: SequelizeSector_1.default,
                        as: 'sector',
                        attributes: ['id', 'name']
                    }
                ]
            });
            if (!aisle) {
                return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: aisle.get() };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_AISLES } };
        }
    }
    async findBySector(sectorId) {
        try {
            const sector = await SequelizeSector_1.default.findByPk(sectorId);
            if (!sector) {
                return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
            }
            const aisles = await SequelizeAisle_1.default.findAll({
                where: { sectorId },
                include: [
                    {
                        model: SequelizeSector_1.default,
                        as: 'sector',
                        attributes: ['id', 'name']
                    }
                ]
            });
            if (!aisles || aisles.length === 0) {
                return { status: 'NOT_FOUND', data: { message: 'No aisles found for this sector' } };
            }
            return { status: 'SUCCESSFUL', data: aisles.map(aisle => aisle.get()) };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_AISLES } };
        }
    }
    async create(aisleData) {
        try {
            const sector = await SequelizeSector_1.default.findByPk(aisleData.sectorId);
            if (!sector) {
                return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
            }
            const existingAisle = await SequelizeAisle_1.default.findOne({
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
            const newAisle = await SequelizeAisle_1.default.create(dataToCreate);
            if (!newAisle) {
                return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_AISLE } };
            }
            const aisleWithSector = await SequelizeAisle_1.default.findByPk(newAisle.id, {
                include: [
                    {
                        model: SequelizeSector_1.default,
                        as: 'sector',
                        attributes: ['id', 'name']
                    }
                ]
            });
            return { status: 'CREATED', data: aisleWithSector.get() };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_AISLE } };
        }
    }
    async update(id, aisleData) {
        try {
            if (aisleData.sectorId) {
                const sector = await SequelizeSector_1.default.findByPk(aisleData.sectorId);
                if (!sector) {
                    return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
                }
            }
            if (aisleData.code || aisleData.sectorId) {
                const currentAisle = await SequelizeAisle_1.default.findByPk(id);
                if (!currentAisle) {
                    return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
                }
                const newSectorId = aisleData.sectorId || currentAisle.sectorId;
                const newCode = aisleData.code || currentAisle.code;
                const existingAisle = await SequelizeAisle_1.default.findOne({
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
            const [affectedRows] = await SequelizeAisle_1.default.update(aisleData, { where: { id } });
            if (affectedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
            }
            const updatedAisle = await SequelizeAisle_1.default.findByPk(id, {
                include: [
                    {
                        model: SequelizeSector_1.default,
                        as: 'sector',
                        attributes: ['id', 'name']
                    }
                ]
            });
            return { status: 'SUCCESSFUL', data: (updatedAisle === null || updatedAisle === void 0 ? void 0 : updatedAisle.get()) || null };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_AISLE } };
        }
    }
    async remove(id) {
        try {
            const deletedRows = await SequelizeAisle_1.default.destroy({ where: { id } });
            if (deletedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.AISLE_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: true };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_DELETING_AISLE } };
        }
    }
}
exports.AisleService = AisleService;
//# sourceMappingURL=AisleService.js.map