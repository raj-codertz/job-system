import { StatusCodes } from 'http-status-codes'
import Job from '../models/jobModel.js'

// import { nanoid} from "nanoid"
// let jobs = [
//     {id: nanoid(), company: 'apple', position: 'front-end'},
//     {id: nanoid(), company: 'google', position: 'back-end'}
// ]

// import {NotFoundError} from "../errors/customErrors.js"

export const getAllJobs = async (req , res) => {
    const jobs = await Job.find({})
    res.status(StatusCodes.OK).json({jobs})
}

export const createJob = async (req, res) => {
    // const { company, position } = req.body
    const job = await Job.create( req.body )
    return res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
    // const { id } = req.params
    const job = await Job.findById(req.params.id)
      // if (!job) throw new NotFoundError(`no job with id ${id}`)
      res.status(StatusCodes.OK).json({ job })
}

export const editJob = async (req, res) => {
    // const { id } = req.params
    const updatedJob = await Job.findByIdAndUpdate( req.params.id, req.body, {
        new:true
    })
    // if (!updatedJob) throw new NotFoundError(`no job with id ${id}`)
    res.status(StatusCodes.OK).json({ msg: 'job updated', job: updatedJob})
}

export const deleteJob = async (req, res) => {
    // const { id } = req.params
    const removedJob = await Job.findByIdAndDelete(req.params.id)
    // if (!removedJob) throw new NotFoundError(`no job with id ${id}`)
    res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob})
}