import UserListing from "../models/listing.model.js"

export const createListing = async (req, res, next) => {
    try {
        const listing = await UserListing.create(req.body);
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}