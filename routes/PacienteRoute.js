import express from 'express'
import { cadastrarPaciente } from '../controllers/PacienteController.js'
import { authToken } from '../helpers/authToken.js'

const PacienteRoute = express.Router()

PacienteRoute.post('/cadastrar', authToken,cadastrarPaciente)

export default PacienteRoute