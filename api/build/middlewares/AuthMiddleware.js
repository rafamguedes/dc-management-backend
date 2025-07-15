"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const JwtService_1 = require("../utils/JwtService");
const TOKEN_NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Token must be a valid token';
class Authenticate {
    //
    static authToken(req, res, next) {
        //
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: TOKEN_NOT_FOUND });
        }
        try {
            const token = JwtService_1.JwtService.splitToken(authorization);
            const payload = JwtService_1.JwtService.verifyToken(token);
            res.locals.user = payload;
        }
        catch (error) {
            return res.status(401).json({ message: INVALID_TOKEN });
        }
        next();
    }
}
exports.Authenticate = Authenticate;
//# sourceMappingURL=AuthMiddleware.js.map