import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utilis/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(200).json("user created succesfully")
    } catch (error) {
        next(error)
        // next(errorHandler(550, 'error from the function'))
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'user not found'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong Credentials!'))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_KEY)
        const { password: hashedPassword, ...rest } = validUser._doc
        res
            .cookie('token', token, { httpOnly: true })
            .status(200)
            .json(rest);
        //  console.log(token);
    } catch (error) {
        next(error);
    }
}

