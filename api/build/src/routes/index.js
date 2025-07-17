"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRoutes_1 = require("./AuthRoutes");
const HealthRoute_1 = require("./HealthRoute");
const UserRoutes_1 = require("./UserRoutes");
const SectorRoutes_1 = require("./SectorRoutes");
const AisleRoutes_1 = require("./AisleRoutes");
const SlotRoutes_1 = require("./SlotRoutes");
const ProductRoutes_1 = require("./ProductRoutes");
const PalletRoutes_1 = require("./PalletRoutes");
const DocsRoute_1 = require("./DocsRoute");
const createMainRoutes = () => {
    const router = (0, express_1.Router)();
    // Health check route
    router.get('/health', HealthRoute_1.default);
    // Documentation route
    router.use('/docs', DocsRoute_1.default);
    // API routes with version prefix
    const apiRouter = (0, express_1.Router)();
    // Auth routes
    apiRouter.use('/auth', AuthRoutes_1.default);
    // Resource routes
    apiRouter.use('/users', UserRoutes_1.default);
    apiRouter.use('/sectors', SectorRoutes_1.default);
    apiRouter.use('/aisles', AisleRoutes_1.default);
    apiRouter.use('/slots', SlotRoutes_1.default);
    apiRouter.use('/products', ProductRoutes_1.default);
    apiRouter.use('/pallets', PalletRoutes_1.default);
    return router;
};
exports.default = createMainRoutes;
//# sourceMappingURL=index.js.map