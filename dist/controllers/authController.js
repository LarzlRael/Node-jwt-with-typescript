"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.singup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    //guardando el usuario
    const user = new userModel_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.password = yield user.encryptPassword(user.password);
    yield user.save();
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.KEY || 'whanever');
    res.header('auth-token', token).json(user);
});
exports.singin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const User = yield userModel_1.default.findOne({ email });
    if (!User)
        return res.status(400).json('Email or password is wrong');
    const correctPassword = yield User.validatePassword(req.body.password);
    if (!correctPassword)
        return res.status(400).json('invalid password');
    const token = jsonwebtoken_1.default.sign({ _id: User._id }, process.env.KEY || 'whanever', {
        expiresIn: 60 * 60 * 24
    });
    return res.header('auth-token', token).json(User);
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.userID);
    if (!user)
        return res.status(404).json('user not found');
    res.json(user);
});
//# sourceMappingURL=authController.js.map