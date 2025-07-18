"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express = require("express");
const routes_1 = require("./routes");
const CorsMiddleware_1 = require("./middlewares/CorsMiddleware");
const configureApp = (app) => {
    app.use(CorsMiddleware_1.default);
    app.use(express.json());
    app.use(routes_1.default);
};
const createApp = () => {
    const app = express();
    configureApp(app);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map