import express from 'express'
import { authToken } from '../helpers/authToken.js'
import { cadastrarMedico } from '../controllers/MedicoController.js'

const MedicoRoute = express.Router()

MedicoRoute.post('/cadastrar', authToken, cadastrarMedico)

export default MedicoRoute