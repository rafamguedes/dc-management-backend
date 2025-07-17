"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createCorsMiddleware = () => {
    return (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
        res.header('Access-Control-Allow-Headers', '*');
        next();
    };
};
exports.default = createCorsMiddleware();
//# sourceMappingURL=CorsMiddleware.js.map