"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class JwtService {
    static createToken(payload) {
        return (0, jsonwebtoken_1.sign)(payload, this.jwtSecret, { expiresIn: '1h', algorithm: 'HS256' });
    }
    static verifyToken(token) {
        return (0, jsonwebtoken_1.verify)(token, this.jwtSecret);
    }
    static splitToken(authorization) {
        return authorization.split(' ')[1];
    }
}
exports.JwtService = JwtService;
JwtService.jwtSecret = process.env.JWT_SECRET || 'secretKey';
//# sourceMappingURL=JwtService.js.map