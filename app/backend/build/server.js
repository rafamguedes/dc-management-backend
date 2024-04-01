"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
const app_1 = require("./app");
class Server {
    constructor(port) {
        this.app = new app_1.App();
        this.port = port;
    }
    start() {
        this.app.start(this.port);
    }
}
const PORT = process.env.PORT || 3001;
new Server(PORT).start();
//# sourceMappingURL=server.js.map