import { configDotenv } from "dotenv"
import jwt from 'jsonwebtoken'
configDotenv()

const SECRET = process.env.SECRET 

export async function authToken(req,res,next){
    const headerToken = req.headers['authorizarion']
    const token = headerToken && headerToken.slipt(' ')[1] 

    if(!token){
        return res.status(403).json({msg: "Acesso negado!"})
    }

    jwt.verify(token, SECRET, (error, result) => {
        if(error){
            return res.status(403).json({msg: "Token inválido!"})
        }

        req.id = id 
        next()
    })
}