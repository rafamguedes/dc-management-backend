"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createCorsMiddleware = () => {
    return (req, res, next) => {
        const allowedOrigins = ['http://localhost:5173'];
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin) || !origin) {
            res.header('Access-Control-Allow-Origin', origin || '*');
        }
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Max-Age', '86400');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
            return;
        }
        next();
    };
};
exports.default = createCorsMiddleware();
//# sourceMappingURL=CorsMiddleware.js.map