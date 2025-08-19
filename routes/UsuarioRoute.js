import express from 'express'
import { criarUsuario, login } from '../controllers/UsuarioController.js'

const UserRoute = express.Router()

UserRoute.post('/cadastrar', criarUsuario)
UserRoute.post('/sign', login)

export default UserRoute