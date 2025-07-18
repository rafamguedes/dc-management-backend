"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const SequelizeProduct_1 = require("../database/models/SequelizeProduct");
class ProductService {
    constructor() {
        this.PRODUCT_NOT_FOUND = 'Product not found';
        this.PRODUCT_ALREADY_EXISTS = 'Product already exists, please try a different code';
        this.ERROR_CREATING_PRODUCT = 'Failed to create product, please try again';
        this.ERROR_FETCHING_PRODUCTS = 'Failed to get products, please try again';
        this.ERROR_UPDATING_PRODUCT = 'Failed to update product, please try again';
        this.ERROR_DELETING_PRODUCT = 'Failed to delete product, please try again';
    }
    async findAll() {
        try {
            const products = await SequelizeProduct_1.default.findAll();
            if (!products || products.length === 0) {
                return { status: 'NOT_FOUND', data: { message: 'No products found' } };
            }
            return { status: 'SUCCESSFUL', data: products };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PRODUCTS } };
        }
    }
    async findById(id) {
        try {
            const product = await SequelizeProduct_1.default.findByPk(id);
            if (!product) {
                return { status: 'NOT_FOUND', data: { message: this.PRODUCT_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: product };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PRODUCTS } };
        }
    }
    async findByCode(code) {
        try {
            const product = await SequelizeProduct_1.default.findOne({ where: { code } });
            if (!product) {
                return { status: 'NOT_FOUND', data: { message: this.PRODUCT_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: product };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PRODUCTS } };
        }
    }
    async findByUnit(unit) {
        try {
            const products = await SequelizeProduct_1.default.findAll({ where: { unit } });
            if (!products || products.length === 0) {
                return { status: 'NOT_FOUND', data: { message: 'No products found with this unit' } };
            }
            return { status: 'SUCCESSFUL', data: products };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PRODUCTS } };
        }
    }
    async create(productData) {
        try {
            const existingProduct = await SequelizeProduct_1.default.findOne({ where: { code: productData.code } });
            if (existingProduct) {
                return { status: 'CONFLICT', data: { message: this.PRODUCT_ALREADY_EXISTS } };
            }
            const dataToCreate = {
                code: productData.code,
                name: productData.name,
                description: productData.description || '',
                unit: productData.unit,
            };
            const newProduct = await SequelizeProduct_1.default.create(dataToCreate);
            if (!newProduct) {
                return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_PRODUCT } };
            }
            return { status: 'CREATED', data: newProduct.get() };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_PRODUCT } };
        }
    }
    async update(id, productData) {
        try {
            if (productData.code) {
                const existingProduct = await SequelizeProduct_1.default.findOne({
                    where: { code: productData.code }
                });
                if (existingProduct && existingProduct.id !== id) {
                    return { status: 'CONFLICT', data: { message: this.PRODUCT_ALREADY_EXISTS } };
                }
            }
            const [affectedRows] = await SequelizeProduct_1.default.update(productData, { where: { id } });
            if (affectedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.PRODUCT_NOT_FOUND } };
            }
            const updatedProduct = await SequelizeProduct_1.default.findByPk(id);
            return { status: 'SUCCESSFUL', data: updatedProduct };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_PRODUCT } };
        }
    }
    async remove(id) {
        try {
            const deletedRows = await SequelizeProduct_1.default.destroy({ where: { id } });
            if (deletedRows === 0) {
                return { status: 'NOT_FOUND', data: { message: this.PRODUCT_NOT_FOUND } };
            }
            return { status: 'SUCCESSFUL', data: true };
        }
        catch (error) {
            return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_DELETING_PRODUCT } };
        }
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map