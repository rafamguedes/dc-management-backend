"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const JwtService_1 = require("../services/JwtService");
const TOKEN_NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Token must be a valid token';
const authToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ message: TOKEN_NOT_FOUND });
        return;
    }
    try {
        const token = JwtService_1.JwtService.splitToken(authorization);
        const payload = JwtService_1.JwtService.verifyToken(token);
        res.locals.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ message: INVALID_TOKEN });
    }
};
exports.Authenticate = {
    authToken
};
//# sourceMappingURL=AuthMiddleware.js.map