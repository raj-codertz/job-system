import {StatusCodes} from 'http-status-codes'
import User from "../models/userModel.js"
import Job from "../models/jobModel.js"

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
    // removing password from req.body just in case if its in there since i don't use it for updation

    const obj = { ...req.body }
    delete obj.password
    const updatedUser = await User.findByIdAndUpdate( req.user.userId, obj)
    res.status(StatusCodes.OK).json({ msg: 'update user'})
}