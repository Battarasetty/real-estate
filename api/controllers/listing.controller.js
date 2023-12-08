import Listing from "../models/listing.model.js";
import { errorHandler } from "../utilis/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};


export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(401, "listing not found"))
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "you can delete your own listings"))
    }
    try {
        const data = await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("Listing successfully deleted!")
    } catch (error) {
        next(error)
    }

}


export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing Not found'))
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update your only listing'))
    }

    try {
        const updateListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updateListing)
    } catch (error) {
        next(error)
    }

}