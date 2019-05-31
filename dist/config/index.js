"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = () => {
    const env = process.env.NODE_ENV;
    switch (env) {
        case 'test': {
            return {
                PORT: process.env.PORT,
            };
        }
        case 'production': {
            return {
                ENV: 'production',
                LOGGER_REGION: process.env.LOGGER_REGION,
                LOGGER_TOKEN: process.env.LOGGER_TOKEN,
                PORT: process.env.PORT,
            };
        }
        default: {
            return {
                ENV: 'development',
                LOGGER_REGION: process.env.LOGGER_REGION,
                LOGGER_TOKEN: process.env.LOGGER_TOKEN,
                PORT: process.env.PORT,
            };
        }
    }
};
exports.default = config();
