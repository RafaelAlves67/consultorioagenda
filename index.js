import express from 'express'
import cors from 'cors' 
// banco de dados
import db from './data/db.js'

// routes
import UserRoute from './routes/UsuarioRoute.js'
import PacienteRoute from './routes/PacienteRoute.js'


const app = express()

// middleware
app.use(cors())
app.use(express.json()) 

// rotas 
app.use('/user', UserRoute)
app.use('/paciente', PacienteRoute)

// iniciar servidor 
async function iniciarServidor(){
    try {
        app.listen(3000, () => {console.log("Iniciando servidor na porta 3000...")})
        db.sync({alter: true})
    } catch (error) {
        console.log("Erro ao iniciar o servidor = > " + error)
    }
}

iniciarServidor();


