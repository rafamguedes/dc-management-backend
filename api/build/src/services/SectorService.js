"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorService = void 0;
const SequelizeSector_1 = require("../database/models/SequelizeSector");
class SectorService {
    constructor() {
        this.SECTOR_NOT_FOUND = 'Sector not found';
        this.SECTOR_ALREADY_EXISTS = 'Sector already exists, please try a different name';
        this.ERROR_CREATING_SECTOR = 'Failed to create sector, please try again';
        this.ERROR_FETCHING_SECTORS = 'Failed to get sectors, please try again';
        this.ERROR_UPDATING_SECTOR = 'Failed to update sector, please try again';
        this.ERROR_DELETING_SECTOR = 'Failed to delete sector, please try again';
    }
    async findAll() {
        try {
            const sectors = await SequelizeSector_1.default.findAll();
            if (!sectors || sectors.length === 0) {
                return { status: 'NOT_FOUND', data: { message: 'No sectors found' } };
            }
            return { status: 'SUCCESSFUL', data: sectors };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SECTORS } };
        }
    }
    async findById(id) {
        try {
            const sector = await SequelizeSector_1.default.findByPk(id);
            if (!sector) {
                return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: sector };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_SECTORS } };
        }
    }
    async create(sectorData) {
        try {
            const existingSector = await SequelizeSector_1.default.findOne({ where: { name: sectorData.name } });
            if (existingSector) {
                return { status: 'CONFLICT', data: { message: this.SECTOR_ALREADY_EXISTS } };
            }
            const dataToCreate = {
                name: sectorData.name,
                description: sectorData.description || '',
            };
            const newSector = await SequelizeSector_1.default.create(dataToCreate);
            if (!newSector) {
                return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_SECTOR } };
            }
            return { status: 'CREATED', data: newSector.get() };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_SECTOR } };
        }
    }
    async update(id, sectorData) {
        try {
            const [affectedRows] = await SequelizeSector_1.default.update(sectorData, { where: { id } });
            if (affectedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
            }
            const updatedSector = await SequelizeSector_1.default.findByPk(id);
            return { status: 'SUCCESSFUL', data: updatedSector };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_SECTOR } };
        }
    }
    async remove(id) {
        try {
            const deletedRows = await SequelizeSector_1.default.destroy({ where: { id } });
            if (deletedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.SECTOR_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: true };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_DELETING_SECTOR } };
        }
    }
}
exports.SectorService = SectorService;
//# sourceMappingURL=SectorService.js.map