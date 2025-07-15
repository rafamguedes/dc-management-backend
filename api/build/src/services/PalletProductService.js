"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalletProductService = void 0;
const sequelize_1 = require("sequelize");
const SequelizePalletProduct_1 = require("../database/models/SequelizePalletProduct");
const SequelizePallet_1 = require("../database/models/SequelizePallet");
const SequelizeProduct_1 = require("../database/models/SequelizeProduct");
class PalletProductService {
    constructor() {
        this.palletProductModel = SequelizePalletProduct_1.default;
    }
    async findAll() {
        try {
            const palletProducts = await this.palletProductModel.findAll({
                order: [['createdAt', 'DESC']],
            });
            return {
                status: 'SUCCESSFUL',
                data: palletProducts,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: [],
            };
        }
    }
    async findById(id) {
        try {
            const palletProduct = await this.palletProductModel.findByPk(id);
            if (!palletProduct) {
                return {
                    status: 'NOT_FOUND',
                    data: null,
                };
            }
            return {
                status: 'SUCCESSFUL',
                data: palletProduct,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: null,
            };
        }
    }
    async findByPalletId(palletId) {
        try {
            const palletProducts = await this.palletProductModel.findAll({
                where: { palletId },
                order: [['createdAt', 'DESC']],
            });
            return {
                status: 'SUCCESSFUL',
                data: palletProducts,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: [],
            };
        }
    }
    async findByProductId(productId) {
        try {
            const palletProducts = await this.palletProductModel.findAll({
                where: { productId },
                order: [['createdAt', 'DESC']],
            });
            return {
                status: 'SUCCESSFUL',
                data: palletProducts,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: [],
            };
        }
    }
    async findWithDetails() {
        try {
            const palletProducts = await this.palletProductModel.findAll({
                include: [
                    {
                        model: SequelizePallet_1.default,
                        as: 'pallet',
                        attributes: ['id', 'type', 'qrCode', 'qrCodeSmall', 'slotId'],
                    },
                    {
                        model: SequelizeProduct_1.default,
                        as: 'product',
                        attributes: ['id', 'name', 'code', 'category', 'weight', 'dimensions'],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return {
                status: 'SUCCESSFUL',
                data: palletProducts,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: [],
            };
        }
    }
    async findByPalletIdWithDetails(palletId) {
        try {
            const palletProducts = await this.palletProductModel.findAll({
                where: { palletId },
                include: [
                    {
                        model: SequelizePallet_1.default,
                        as: 'pallet',
                        attributes: ['id', 'type', 'qrCode', 'qrCodeSmall', 'slotId'],
                    },
                    {
                        model: SequelizeProduct_1.default,
                        as: 'product',
                        attributes: ['id', 'name', 'code', 'category', 'weight', 'dimensions'],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return {
                status: 'SUCCESSFUL',
                data: palletProducts,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: [],
            };
        }
    }
    async findByProductIdWithDetails(productId) {
        try {
            const palletProducts = await this.palletProductModel.findAll({
                where: { productId },
                include: [
                    {
                        model: SequelizePallet_1.default,
                        as: 'pallet',
                        attributes: ['id', 'type', 'qrCode', 'qrCodeSmall', 'slotId'],
                    },
                    {
                        model: SequelizeProduct_1.default,
                        as: 'product',
                        attributes: ['id', 'name', 'code', 'category', 'weight', 'dimensions'],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return {
                status: 'SUCCESSFUL',
                data: palletProducts,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: [],
            };
        }
    }
    async findExpiringSoon(days = 7) {
        try {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + days);
            const palletProducts = await this.palletProductModel.findAll({
                where: {
                    expiryDate: {
                        [sequelize_1.Op.lte]: expiryDate.toISOString().split('T')[0],
                        [sequelize_1.Op.gte]: new Date().toISOString().split('T')[0],
                    },
                },
                include: [
                    {
                        model: SequelizePallet_1.default,
                        as: 'pallet',
                        attributes: ['id', 'type', 'qrCode', 'qrCodeSmall', 'slotId'],
                    },
                    {
                        model: SequelizeProduct_1.default,
                        as: 'product',
                        attributes: ['id', 'name', 'code', 'category', 'weight', 'dimensions'],
                    },
                ],
                order: [['expiryDate', 'ASC']],
            });
            return {
                status: 'SUCCESSFUL',
                data: palletProducts,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: [],
            };
        }
    }
    async findExpired() {
        try {
            const today = new Date().toISOString().split('T')[0];
            const palletProducts = await this.palletProductModel.findAll({
                where: {
                    expiryDate: {
                        [sequelize_1.Op.lt]: today,
                    },
                },
                include: [
                    {
                        model: SequelizePallet_1.default,
                        as: 'pallet',
                        attributes: ['id', 'type', 'qrCode', 'qrCodeSmall', 'slotId'],
                    },
                    {
                        model: SequelizeProduct_1.default,
                        as: 'product',
                        attributes: ['id', 'name', 'code', 'category', 'weight', 'dimensions'],
                    },
                ],
                order: [['expiryDate', 'ASC']],
            });
            return {
                status: 'SUCCESSFUL',
                data: palletProducts,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: [],
            };
        }
    }
    async create(data) {
        try {
            // Check if the pallet-product combination already exists
            const existingPalletProduct = await this.palletProductModel.findOne({
                where: {
                    palletId: data.palletId,
                    productId: data.productId,
                },
            });
            if (existingPalletProduct) {
                return {
                    status: 'CONFLICT',
                    data: {},
                };
            }
            const newPalletProduct = await this.palletProductModel.create(data);
            return {
                status: 'CREATED',
                data: newPalletProduct,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: {},
            };
        }
    }
    async update(id, data) {
        try {
            const palletProduct = await this.palletProductModel.findByPk(id);
            if (!palletProduct) {
                return {
                    status: 'NOT_FOUND',
                    data: null,
                };
            }
            await palletProduct.update(data);
            return {
                status: 'SUCCESSFUL',
                data: palletProduct,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: null,
            };
        }
    }
    async remove(id) {
        try {
            const palletProduct = await this.palletProductModel.findByPk(id);
            if (!palletProduct) {
                return {
                    status: 'NOT_FOUND',
                    data: false,
                };
            }
            await palletProduct.destroy();
            return {
                status: 'SUCCESSFUL',
                data: true,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: false,
            };
        }
    }
    async removeByPallet(palletId) {
        try {
            const deletedCount = await this.palletProductModel.destroy({
                where: { palletId },
            });
            return {
                status: deletedCount > 0 ? 'SUCCESSFUL' : 'NOT_FOUND',
                data: deletedCount > 0,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: false,
            };
        }
    }
    async removeByProduct(productId) {
        try {
            const deletedCount = await this.palletProductModel.destroy({
                where: { productId },
            });
            return {
                status: deletedCount > 0 ? 'SUCCESSFUL' : 'NOT_FOUND',
                data: deletedCount > 0,
            };
        }
        catch (error) {
            return {
                status: 'INTERNAL_ERROR',
                data: false,
            };
        }
    }
}
exports.PalletProductService = PalletProductService;
//# sourceMappingURL=PalletProductService.js.map