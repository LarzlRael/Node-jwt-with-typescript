import { Request, Response } from 'express/';
import userModel, { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
export const singup = async (req: Request, res: Response) => {
    console.log(req.body);

    //guardando el usuario
    const user: IUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password

    });

    user.password = await user.encryptPassword(user.password);
    await user.save();
    const token: string = jwt.sign({ _id: user._id }, process.env.KEY || 'whanever');

    res.header('auth-token', token).json(user);
};
export const singin = async (req: Request, res: Response) => {
    const { email } = req.body;
    const User = await userModel.findOne({ email });
    if (!User) return res.status(400).json('Email or password is wrong');

    const correctPassword: boolean = await User.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('invalid password');
    const token: string = jwt.sign({ _id: User._id }, process.env.KEY || 'whanever', {
        expiresIn: 60 * 60 * 24
    })
    return res.header('auth-token', token).json(User);

};
export const profile = async (req: Request, res: Response) => {

    const user = await userModel.findById(req.userID);
    if (!user) return res.status(404).json('user not found')
    res.json(user)
};