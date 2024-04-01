"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = void 0;
//
const StatusCode = (status) => {
    //
    switch (status) {
        //
        case 'SUCCESSFUL': return 200;
        case 'CREATED': return 201;
        case 'INVALID_DATA': return 400;
        case 'UNAUTHORIZED': return 401;
        case 'NOT_FOUND': return 404;
        case 'CONFLICT': return 409;
        case 'UNPROCESSABLE_ENTITY': return 422;
        case 'INTERNAL_ERROR': return 500;
        default: return 500;
    }
};
exports.StatusCode = StatusCode;
//# sourceMappingURL=StatusCode.js.map