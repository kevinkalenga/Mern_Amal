import { errorHandler } from "../utils/errors.js"
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.json({
        message: "Api de test fonctionne"
    })
}

export const updateUser = async (req, res, next) => {
    console.log(req.body.user)
    if(req.user.id !== req.params.id) 
        return next(errorHandler(401, 'Tu peux seulement mettre à jour ton propre compte! ')) ;

    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                }
            },
            {new: true}
        );
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}