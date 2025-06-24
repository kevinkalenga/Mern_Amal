import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/errors.js";


export const createListing = async(req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if(!listing) {
        return next(errorHandler(401, "L'annonce non trouvée"))
    }

    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'Tu ne peux supprimer que ta propre annonce!'))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("L'annonce a été supprimée avec succèss")
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing) {
        return next(errorHandler(404, "L'annonce non trouvée"))
    }

    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401, "Tu ne peux seulement modifier tes propres annonces"))
    }

    try {
        const updateListing = await Listing.findByIdAndUpdate(
            req.params.id, req.body, {new: true}
        );
        res.status(200).json(updateListing)
    } catch (error) {
        next(error)
    }
}

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing) {
            return next(errorHandler(404, "L'annonce non trouvée"))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}