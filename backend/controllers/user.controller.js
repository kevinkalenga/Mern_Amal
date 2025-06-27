import { errorHandler } from "../utils/errors.js"
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
    res.json({
        message: "Api de test fonctionne"
    })
}



export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'Tu peux seulement mettre à jour ton propre compte!'));
    }

    try {
        const updates = {};

        // Only set the fields that exist in the request body
        if (req.body.username) updates.username = req.body.username;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.avatar) updates.avatar = req.body.avatar;
        if (req.body.password) {
            updates.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if(req.user.id !==  req.params.id) {
        return next(errorHandler(401, "Tu ne peux seulement supprimer ton propre compte!"))
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('acess_token')
        res.status(200).json("L'utilisateur supprimé")
    } catch (error) {
        next(error)
    }
}

export const getUserListings = async (req, res, next) => {
    if(req.user.id === req.params.id) {
        try {
            // recup les annonces de l'utilisateur
            const listings = await Listing.find({userRef: req.params.id})
            res.status(200).json(listings)
        } catch (error) {
          next(error)  
        }
    } else {
        return next(errorHandler(401, 'Tu ne peux voir que tes propres annonces!'))
    }
}

// fonction permettant de recup le user qui va contacter le proprietaire 
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return next(errorHandler(404, "L'utilisateur non trouvé"))
        const {password: pass, ...rest} = user._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}