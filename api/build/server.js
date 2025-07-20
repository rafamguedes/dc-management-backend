"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 3001;
const startServer = () => {
    console.log('🚀 Starting server...');
    const app = (0, app_1.createApp)();
    const server = app.listen(PORT, () => {
        console.log(`✅ Server running on port: ${PORT}`);
        console.log(`📚 Documentation: http://localhost:${PORT}/docs/swagger`);
        console.log(`❤️ Health check: http://localhost:${PORT}/health`);
    });
    // Handle server errors
    server.on('error', (error) => {
        console.error('❌ Server error:', error);
        process.exit(1);
    });
    // Graceful shutdown
    const shutdown = (signal) => {
        console.log(`\n${signal} received. Shutting down gracefully...`);
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGUSR2', () => shutdown('SIGUSR2')); // For nodemon
};
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
startServer();
//# sourceMappingURL=server.js.map