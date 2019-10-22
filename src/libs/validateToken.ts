import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface IpayLoad {
    _id: string,
    iat: number,
    exp: number
}

export const TokenValidate = (req: Request, res: Response, next: NextFunction) => {

    console.log('estoy funcionando')

    const token = req.header('auth-token');

    if (!token) return res.status(401).json('Access Denied ');

    const payload = jwt.verify(token, process.env.KEY || 'whanever') as IpayLoad;
    req.userID = payload._id;
    console.log('estado : ', payload)
    next();
}