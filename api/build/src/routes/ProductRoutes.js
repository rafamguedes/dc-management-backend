"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const ProductMiddleware_1 = require("../middlewares/ProductMiddleware");
const createProductRoutes = () => {
    const router = (0, express_1.Router)();
    const productController = new ProductController_1.ProductController();
    router.post('/', AuthMiddleware_1.Authenticate.authToken, ProductMiddleware_1.ProductValidator.validateBody, (req, res) => productController.create(req, res));
    router.get('/', AuthMiddleware_1.Authenticate.authToken, (req, res) => productController.findAll(req, res));
    router.get('/:id', AuthMiddleware_1.Authenticate.authToken, ProductMiddleware_1.ProductValidator.validateParams, (req, res) => productController.findById(req, res));
    router.get('/code/:code', AuthMiddleware_1.Authenticate.authToken, ProductMiddleware_1.ProductValidator.validateCodeParams, (req, res) => productController.findByCode(req, res));
    router.get('/unit/:unit', AuthMiddleware_1.Authenticate.authToken, ProductMiddleware_1.ProductValidator.validateUnitParams, (req, res) => productController.findByUnit(req, res));
    router.put('/:id', AuthMiddleware_1.Authenticate.authToken, ProductMiddleware_1.ProductValidator.validateParams, ProductMiddleware_1.ProductValidator.validateUpdateBody, (req, res) => productController.update(req, res));
    router.delete('/:id', AuthMiddleware_1.Authenticate.authToken, ProductMiddleware_1.ProductValidator.validateParams, (req, res) => productController.remove(req, res));
    return router;
};
exports.default = createProductRoutes();
//# sourceMappingURL=ProductRoutes.js.map