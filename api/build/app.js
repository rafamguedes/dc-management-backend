"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
//
const express = require("express");
const routes_1 = require("./routes");
class App {
    constructor() {
        this.mainRoutes = new routes_1.default();
        this.app = express();
        this.mainRoutes = new routes_1.default();
        this.config();
        this.routes();
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express.json());
        this.app.use(accessControl);
    }
    routes() {
        this.app.use(this.mainRoutes.router);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port: ${PORT}!!`));
    }
}
exports.App = App;
exports.app = new App().app;
//# sourceMappingURL=app.js.map