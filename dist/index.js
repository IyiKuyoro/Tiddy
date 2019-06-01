"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./logger");
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
const PORT = config_1.default.PORT || 3000;
server.listen(PORT, () => {
    logger_1.Logger.info(`Server is running in http://localhost:${PORT}`);
});
exports.default = app_1.default;
