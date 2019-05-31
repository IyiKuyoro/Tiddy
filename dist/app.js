"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use(morgan_1.default('dev'));
app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        success: false,
    });
});
exports.default = app;
