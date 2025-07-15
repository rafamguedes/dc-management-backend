"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginRoutes_1 = require("./LoginRoutes");
const HealthRoute_1 = require("./HealthRoute");
const UserRoutes_1 = require("./UserRoutes");
class MainRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use('/', HealthRoute_1.default);
        this.router.use('/login', LoginRoutes_1.default);
        this.router.use('/user', UserRoutes_1.default);
    }
}
exports.default = MainRoutes;
//# sourceMappingURL=index.js.map