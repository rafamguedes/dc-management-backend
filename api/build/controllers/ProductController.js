"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const StatusCodes_1 = require("../utils/StatusCodes");
const ProductService_1 = require("../services/ProductService");
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management operations
 */
class ProductController {
    constructor(productService = new ProductService_1.ProductService()) {
        this.productService = productService;
    }
    /**
     * @swagger
     * /products:
     *   get:
     *     summary: Get all products
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of all products
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: No products found
     *       500:
     *         description: Internal server error
     */
    async findAll(_req, res) {
        const { status, data } = await this.productService.findAll();
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /products/{id}:
     *   get:
     *     summary: Get product by ID
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Product ID
     *     responses:
     *       200:
     *         description: Product details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Product not found
     *       500:
     *         description: Internal server error
     */
    async findById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.productService.findById(+id);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /products/code/{code}:
     *   get:
     *     summary: Get product by code
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: code
     *         required: true
     *         schema:
     *           type: string
     *         description: Product code
     *     responses:
     *       200:
     *         description: Product details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Product not found
     *       500:
     *         description: Internal server error
     */
    async findByCode(req, res) {
        const { code } = req.params;
        const { status, data } = await this.productService.findByCode(code);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /products/unit/{unit}:
     *   get:
     *     summary: Get products by unit
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: unit
     *         required: true
     *         schema:
     *           type: string
     *         description: Product unit
     *     responses:
     *       200:
     *         description: List of products with the specified unit
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: No products found with the specified unit
     *       500:
     *         description: Internal server error
     */
    async findByUnit(req, res) {
        const { unit } = req.params;
        const { status, data } = await this.productService.findByUnit(unit);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /products:
     *   post:
     *     summary: Create a new product
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - code
     *               - name
     *               - unit
     *             properties:
     *               code:
     *                 type: string
     *                 description: Unique product code
     *                 example: "PROD-001"
     *               name:
     *                 type: string
     *                 description: Product name
     *                 example: "Laptop Dell XPS 13"
     *               description:
     *                 type: string
     *                 description: Product description
     *                 example: "High-performance laptop for professionals"
     *               unit:
     *                 type: string
     *                 description: Product unit of measurement
     *                 example: "pcs"
     *     responses:
     *       201:
     *         description: Product created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       400:
     *         description: Invalid input data
     *       401:
     *         description: Unauthorized
     *       409:
     *         description: Product already exists
     *       500:
     *         description: Internal server error
     */
    async create(req, res) {
        const { code, name, description, unit } = req.body;
        const { status, data } = await this.productService.create({
            code,
            name,
            description,
            unit,
        });
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /products/{id}:
     *   put:
     *     summary: Update a product
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Product ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               code:
     *                 type: string
     *                 description: Unique product code
     *                 example: "PROD-001-V2"
     *               name:
     *                 type: string
     *                 description: Product name
     *                 example: "Updated Laptop Dell XPS 13"
     *               description:
     *                 type: string
     *                 description: Product description
     *                 example: "Updated high-performance laptop for professionals"
     *               unit:
     *                 type: string
     *                 description: Product unit of measurement
     *                 example: "pcs"
     *     responses:
     *       200:
     *         description: Product updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       400:
     *         description: Invalid input data
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Product not found
     *       500:
     *         description: Internal server error
     */
    async update(req, res) {
        const { id } = req.params;
        const { code, name, description, unit } = req.body;
        const { status, data } = await this.productService.update(+id, {
            code,
            name,
            description,
            unit,
        });
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
    /**
     * @swagger
     * /products/{id}:
     *   delete:
     *     summary: Delete a product
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Product ID
     *     responses:
     *       200:
     *         description: Product deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Product deleted successfully"
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Product not found
     *       500:
     *         description: Internal server error
     */
    async remove(req, res) {
        const { id } = req.params;
        const { status, data } = await this.productService.remove(+id);
        return res.status(StatusCodes_1.StatusCodes[status]).json(data);
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map