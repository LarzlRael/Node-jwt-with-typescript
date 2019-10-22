"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
//settings
app.set('port', 4000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//middelwares
app.use(morgan_1.default('dev'));
app.use(indexRouter_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map