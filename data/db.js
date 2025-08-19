import { Sequelize } from "sequelize"; 
import { configDotenv } from "dotenv";
configDotenv() 

const db_user = process.env.db_user
const db_pass = process.env.db_pass
const db_host = process.env.db_host
const db_name = process.env.db_name

const db = new Sequelize(db_name, db_user, db_pass, {
    host: db_host, 
    dialect: 'postgres'
})

// conectar ao banco 
async function conectarBanco(){
    try {
        await db.authenticate();
        console.log("Banco de dados conectado")
    } catch (error) {
         console.log("Erro ao conectar ao banco de dados => " + error)
    }
}

conectarBanco();

export default db