import express from 'express'
import { authToken } from '../helpers/authToken.js'
import { cadastrarServico, deletarServico, editarServico, listarServico } from '../controllers/ServicoController.js'

const ServicoRoute = express.Router()

ServicoRoute.post('/cadastrar', authToken, cadastrarServico)
ServicoRoute.post('/editar', authToken, editarServico)
ServicoRoute.post('/excluir', authToken, deletarServico)
ServicoRoute.post('/listar', authToken, listarServico)

export default ServicoRoute