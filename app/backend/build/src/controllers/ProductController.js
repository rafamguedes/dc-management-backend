"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const StatusCode_1 = require("../utils/StatusCode");
const ProductService_1 = require("../services/ProductService");
class ProductController {
    constructor(productService = new ProductService_1.ProductService()) {
        this.productService = productService;
    }
    async findAll(_req, res) {
        const { status, data } = await this.productService.findAll();
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.productService.findById(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findByCode(req, res) {
        const { code } = req.params;
        const { status, data } = await this.productService.findByCode(code);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async findByUnit(req, res) {
        const { unit } = req.params;
        const { status, data } = await this.productService.findByUnit(unit);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async create(req, res) {
        const { code, name, description, unit } = req.body;
        const { status, data } = await this.productService.create({
            code,
            name,
            description,
            unit,
        });
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async update(req, res) {
        const { id } = req.params;
        const { code, name, description, unit } = req.body;
        const { status, data } = await this.productService.update(+id, {
            code,
            name,
            description,
            unit,
        });
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.productService.remove(+id);
        return res.status(StatusCode_1.StatusCodes[status]).json(data);
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map