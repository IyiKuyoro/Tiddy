"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const r7insight_node_1 = __importDefault(require("r7insight_node"));
const config_1 = __importDefault(require("./config"));
const log = new r7insight_node_1.default({
    region: config_1.default.LOGGER_REGION,
    token: config_1.default.LOGGER_TOKEN,
});
class Logger {
    static info(msg) {
        if (config_1.default.ENV === 'production') {
            log.info(msg);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(msg);
        }
    }
}
exports.Logger = Logger;
