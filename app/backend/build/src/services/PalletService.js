"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalletService = void 0;
const SequelizePallet_1 = require("../database/models/SequelizePallet");
const sequelize_1 = require("sequelize");
class PalletService {
    constructor() {
        this.PALLET_NOT_FOUND = 'Pallet not found';
        this.PALLET_ALREADY_EXISTS = 'Pallet already exists, please try a different QR code';
        this.ERROR_CREATING_PALLET = 'Failed to create pallet, please try again';
        this.ERROR_FETCHING_PALLETS = 'Failed to get pallets, please try again';
        this.ERROR_UPDATING_PALLET = 'Failed to update pallet, please try again';
        this.ERROR_DELETING_PALLET = 'Failed to delete pallet, please try again';
        this.palletModel = SequelizePallet_1.default;
    }
    async findAll() {
        try {
            const pallets = await this.palletModel.findAll();
            if (!pallets || pallets.length === 0) {
                return { status: 'NOT_FOUND', data: { message: 'No pallets found' } };
            }
            return { status: 'SUCCESSFUL', data: pallets };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
        }
    }
    async findById(id) {
        try {
            const pallet = await this.palletModel.findByPk(id);
            if (!pallet) {
                return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: pallet };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
        }
    }
    async findBySlot(slotId) {
        try {
            const pallets = await this.palletModel.findAll({ where: { slotId } });
            if (!pallets || pallets.length === 0) {
                return { status: 'NOT_FOUND', data: { message: 'No pallets found in this slot' } };
            }
            return { status: 'SUCCESSFUL', data: pallets };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
        }
    }
    async findByType(type) {
        try {
            const pallets = await this.palletModel.findAll({ where: { type } });
            if (!pallets || pallets.length === 0) {
                return { status: 'NOT_FOUND', data: { message: `No ${type} pallets found` } };
            }
            return { status: 'SUCCESSFUL', data: pallets };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
        }
    }
    async findByQrCode(qrCode) {
        try {
            const pallet = await this.palletModel.findOne({ where: { qrCode } });
            if (!pallet) {
                return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: pallet };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
        }
    }
    async findByQrCodeSmall(qrCodeSmall) {
        try {
            const pallet = await this.palletModel.findOne({ where: { qrCodeSmall } });
            if (!pallet) {
                return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: pallet };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
        }
    }
    async findUnassigned() {
        try {
            const pallets = await this.palletModel.findAll({ where: { slotId: null } });
            if (!pallets || pallets.length === 0) {
                return { status: 'NOT_FOUND', data: { message: 'No unassigned pallets found' } };
            }
            return { status: 'SUCCESSFUL', data: pallets };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
        }
    }
    async create(palletData) {
        try {
            const existingPallet = await this.palletModel.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        { qrCode: palletData.qrCode },
                        { qrCodeSmall: palletData.qrCodeSmall }
                    ]
                }
            });
            if (existingPallet) {
                return { status: 'CONFLICT', data: { message: this.PALLET_ALREADY_EXISTS } };
            }
            const dataToCreate = {
                type: palletData.type,
                slotId: palletData.slotId || null,
                qrCode: palletData.qrCode,
                qrCodeSmall: palletData.qrCodeSmall,
            };
            const newPallet = await this.palletModel.create(dataToCreate);
            if (!newPallet) {
                return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_PALLET } };
            }
            return { status: 'CREATED', data: newPallet.get() };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_PALLET } };
        }
    }
    async update(id, palletData) {
        try {
            // Check if trying to update QR codes to existing ones
            if (palletData.qrCode || palletData.qrCodeSmall) {
                const existingPallet = await this.palletModel.findOne({
                    where: {
                        [sequelize_1.Op.or]: [
                            ...(palletData.qrCode ? [{ qrCode: palletData.qrCode }] : []),
                            ...(palletData.qrCodeSmall ? [{ qrCodeSmall: palletData.qrCodeSmall }] : [])
                        ]
                    }
                });
                if (existingPallet && existingPallet.id !== id) {
                    return { status: 'CONFLICT', data: { message: this.PALLET_ALREADY_EXISTS } };
                }
            }
            const [affectedRows] = await this.palletModel.update(palletData, { where: { id } });
            if (affectedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
            }
            const updatedPallet = await this.palletModel.findByPk(id);
            return { status: 'SUCCESSFUL', data: updatedPallet };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_PALLET } };
        }
    }
    async assignToSlot(id, slotId) {
        try {
            const [affectedRows] = await this.palletModel.update({ slotId }, { where: { id } });
            if (affectedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
            }
            const updatedPallet = await this.palletModel.findByPk(id);
            return { status: 'SUCCESSFUL', data: updatedPallet };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_PALLET } };
        }
    }
    async unassignFromSlot(id) {
        try {
            const [affectedRows] = await this.palletModel.update({ slotId: null }, { where: { id } });
            if (affectedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
            }
            const updatedPallet = await this.palletModel.findByPk(id);
            return { status: 'SUCCESSFUL', data: updatedPallet };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_PALLET } };
        }
    }
    async remove(id) {
        try {
            const deletedRows = await this.palletModel.destroy({ where: { id } });
            if (deletedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: true };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_DELETING_PALLET } };
        }
    }
}
exports.PalletService = PalletService;
//# sourceMappingURL=PalletService.js.map