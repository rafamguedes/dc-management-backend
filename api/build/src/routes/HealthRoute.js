"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createHealthRoute = () => {
    const router = (0, express_1.Router)();
    router.get('/', (_req, res) => res.status(200).send('Health Check OK!'));
    return router;
};
exports.default = createHealthRoute();
//# sourceMappingURL=HealthRoute.js.map