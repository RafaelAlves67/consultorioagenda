import express from 'express'
import { authToken } from '../helpers/authToken.js'
import { cadastrarAgenda } from '../controllers/AgendaController.js'


const agendaRoute = express.Router()


agendaRoute.post('/agendar', authToken,cadastrarAgenda)

export default agendaRoute

