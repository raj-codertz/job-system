import {StatusCodes} from 'http-status-codes'
import User from "../models/userModel.js"
import Job from "../models/jobModel.js"
import cloudinary from "cloudinary";
import { promises as fs } from "fs"
export const getCurrentUser = async (req, res) => {
    const user = await User.findOne( {_id:req.user.userId })
    const userWithoutPassword = user.toJSON()
    res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}
export const getApplicationStats = async (req, res) => {
    const user = await User.countDocuments()
    const job = await Job.countDocuments()
    res.status(StatusCodes.OK).json({ user, job })
}
export const updateUser = async (req, res) => {
    // removing password from req.body just in case if its in there since it doesn't use it for update
    const newUser = { ...req.body }
    delete newUser.password

    // checking if there is an avatar file from a user
    if (req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path)
        await fs.unlink(req.file.path)
        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }
    // this updateUser return an old instances of user's details then
    const updatedUser = await User.findByIdAndUpdate( req.user.userId, newUser)

    // checking if an old file avatar exist and delete from cloudinary
    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    res.status(StatusCodes.OK).json({ msg: 'update user'})
}