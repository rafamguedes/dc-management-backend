"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../database/models");
const createHealthRoute = () => {
    const router = (0, express_1.Router)();
    router.get('/', async (_req, res) => {
        try {
            // Test database connection
            await models_1.default.authenticate();
            res.status(200).json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                database: 'connected',
                uptime: process.uptime(),
                memory: process.memoryUsage()
            });
        }
        catch (error) {
            console.error('Health check failed:', error);
            res.status(503).json({
                status: 'ERROR',
                timestamp: new Date().toISOString(),
                database: 'disconnected',
                error: error instanceof Error ? error.message : 'Unknown error',
                uptime: process.uptime(),
                memory: process.memoryUsage()
            });
        }
    });
    return router;
};
exports.default = createHealthRoute();
//# sourceMappingURL=HealthRoute.js.map