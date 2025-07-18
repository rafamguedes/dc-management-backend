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
    router.get('/', (_req, res) => res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() }));
    router.use('/health', HealthRoute_1.default);
    router.use('/docs', DocsRoute_1.default);
    router.use('/auth', AuthRoutes_1.default);
    router.use('/users', UserRoutes_1.default);
    router.use('/sectors', SectorRoutes_1.default);
    router.use('/aisles', AisleRoutes_1.default);
    router.use('/slots', SlotRoutes_1.default);
    router.use('/products', ProductRoutes_1.default);
    router.use('/pallets', PalletRoutes_1.default);
    return router;
};
exports.default = createMainRoutes;
//# sourceMappingURL=index.js.map