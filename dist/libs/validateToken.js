"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.TokenValidate = (req, res, next) => {
    console.log('estoy funcionando');
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json('Access Denied ');
    const payload = jsonwebtoken_1.default.verify(token, process.env.KEY || 'whanever');
    req.userID = payload._id;
    console.log('estado : ', payload);
    next();
};
//# sourceMappingURL=validateToken.js.map