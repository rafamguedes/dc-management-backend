"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_api_reference_1 = require("@scalar/express-api-reference");
const swagger_1 = require("../config/swagger");
const router = (0, express_1.Router)();
router.use('/swagger', (0, express_api_reference_1.apiReference)({
    theme: 'kepler',
    spec: {
        content: swagger_1.swaggerSpec,
    },
    metaData: {
        title: 'Warehouse Management API Documentation',
        description: 'Complete API documentation for the warehouse management system',
        ogDescription: 'Warehouse Management API with authentication, inventory tracking, and QR code integration',
    },
    customCss: `
    .scalar-app {
      --scalar-color-1: #1f2937;
      --scalar-color-2: #374151;
      --scalar-color-3: #4b5563;
      --scalar-color-accent: #3b82f6;
      --scalar-border-color: #e5e7eb;
      --scalar-background-1: #ffffff;
      --scalar-background-2: #f9fafb;
      --scalar-background-3: #f3f4f6;
    }
  `,
}));
router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_1.swaggerSpec);
});
exports.default = router;
//# sourceMappingURL=DocsRoute.js.map