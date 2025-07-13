"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';
const createToken = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
};
const verifyToken = (token) => {
    return (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
};
const splitToken = (authorization) => {
    return authorization.split(' ')[1];
};
exports.JwtService = {
    createToken,
    verifyToken,
    splitToken
};
//# sourceMappingURL=JwtService.js.map