import jwt from 'jsonwebtoken';
import { errorHandler } from './errors.js';

export const verifyToken = (req, res, next) => {
    // On recup le token 
    const token = req.cookies.access_token;
    // Si c ps un bon token
    if(!token) return next(errorHandler(401, "Tu n'as pas le droit")); 

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, 'Interdiction'));

        req.user = user;
        next()
    }) 
}