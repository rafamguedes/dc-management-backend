"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HealthRoute {
    constructor() {
        //
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        //
        this.router.get('/', (_req, res) => res.status(200).send('Health Check OK!'));
    }
}
exports.default = new HealthRoute().router;
//# sourceMappingURL=HealthRoute.js.map