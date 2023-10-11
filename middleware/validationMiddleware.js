import { body, param, validationResult} from "express-validator"
import {BadRequestError, NotFoundError} from "../errors/customErrors.js"
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.js";
import mongoose from "mongoose"
import Job from "../models/jobModel.js";

// first creating a function that return errors
const withValidationErrors = validateValues => {
    //since i have two things validatevalues and the middleware, in express js we can group them together using an array
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map( error => error.msg )
            if (errorMessage[0].startsWith('no job')) {
                throw new NotFoundError(errorMessage)
            }
            throw new BadRequestError(errorMessage)
            // return res.status(400).json({ errors: errorMessage })
        }
        next()
    }
   ]
}

export const validationJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('jobLocation is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid type value')

])
export const validateIdParam = withValidationErrors([
    param('id').custom(async value => {
        const isValidId  =  mongoose.Types.ObjectId.isValid(value)
        if (!isValidId) throw new BadRequestError('invalid MongoDB id')

        const job = await Job.findById(value)
        if (!job) throw new NotFoundError(`no job with id ${value}`)
    })

])