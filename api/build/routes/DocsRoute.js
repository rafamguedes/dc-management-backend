"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_1 = require("../config/swagger");
const router = (0, express_1.Router)();
router.get('/swagger', (req, res) => {
    const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>API Documentation</title>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3.25.0/swagger-ui.css" />
  </head>
  <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@3.25.0/swagger-ui-bundle.js"></script>
      <script>
          SwaggerUIBundle({
              url: '/docs/swagger.json',
              dom_id: '#swagger-ui',
              presets: [
                  SwaggerUIBundle.presets.apis,
                  SwaggerUIBundle.presets.standalone
              ]
          });
      </script>
  </body>
  </html>`;
    res.send(html);
});
router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_1.swaggerSpec);
});
exports.default = router;
//# sourceMappingURL=DocsRoute.js.map