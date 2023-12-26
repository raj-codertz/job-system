import { Router } from 'express'
const router = Router()

import {
    getAllJobs,
    createJob,
    getJob,
    editJob,
    deleteJob} from '../controllers/jobController.js'
import {validateIdParam, validationJobInput} from "../middleware/validationMiddleware.js";

// or you can use method chaining the controllers
router.route('/').get(getAllJobs).post(validationJobInput, createJob)
router.route('/:id').get(validateIdParam, getJob).patch(validationJobInput, validateIdParam, editJob).delete(validateIdParam, deleteJob)

export default router
