import { StatusCodes} from "http-status-codes"
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import {comparePasswords, hashPassword} from "../utils/passwordUtils.js"
import {UnauthenticatedError} from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
export const register = async (req, res) => {
      const isFirstAccount = await User.countDocuments() === 0
      req.body.role = isFirstAccount ? 'admin' : 'user'

      // const salt = await bcrypt.genSalt(10)
      // const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const hashedPassword = await hashPassword(req.body.password)
      req.body.password = hashedPassword

      const user = await User.create(req.body)
      res.status(StatusCodes.CREATED).json({msg: 'user created'})
}

export const login = async (req, res) => {
      const user = await User.findOne({ email: req.body.email})
      console.log(user)
      const isValidUser = user && (await comparePasswords(req.body.password, user.password))
      if (!isValidUser) throw new UnauthenticatedError('invalid credentials')
      // if (!user) throw new UnauthenticatedError('invalid credentials')
      // const isPasswordCorrect = await comparePasswords(req.body.password, user.password)
      // if (!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials')
      const token = createJWT({ userId: user._id, role: user.role})
      const oneDay = 1000 * 60 * 60 * 24
      res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDay),
            // secure will be used in production since it requires https connection but it will not work in development since we are using http connection
            secure: process.env.NODE_ENV === 'production'
      })
      res.status(StatusCodes.OK).json({ msg: 'user logged in'})
}

export const logout = (req, res) => {
      res.cookie('token', 'logout', {
            httpOnly: true,
            expires: new Date(Date.now())
      })
      res.status(StatusCodes.OK).json({ msg: 'user logged out'})
}