"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 3001;
const startServer = () => {
    const app = (0, app_1.createApp)();
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}!!`);
    });
};
startServer();
//# sourceMappingURL=server.js.map