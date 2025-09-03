import express from 'express'
import { cadastrarPaciente } from '../controllers/PacienteController.js'

const PacienteRoute = express.Router()

PacienteRoute.post('/cadastrar', cadastrarPaciente)

export default PacienteRoute