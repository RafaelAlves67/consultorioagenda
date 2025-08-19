import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
configDotenv()
import Usuario from '../models/UsuarioModel.js'


// CRIAR USUARIO 
export async function criarUsuario(req,res) {
    try {
        const {nome, email, password, confirmaPassword, phone, data_nascimento} = req.body 


        if(!nome || !email || !password || !confirmaPassword || !phone || !data_nascimento){
            return res.status(400).json({msg: "Preencha os campos necessários para cadastro de usuário"})
        }

        // verificar se o email está cadastrado 
        const verificaEmail = await Usuario.findOne({where: {email: email}})
        if(verificaEmail){
            return res.status(400).json({msg: "E-mail já cadastrado!"})
        }

        // senhas iguais
        if(password !== confirmaPassword){
            return res.status(400).json({msg: "As senhas não coincidem!"})
        }

        // criptografar a senha
        const hash = 12 
        const hashPassword = await bcrypt.hash(password, hash) 

        // celular
        if(phone.length !== 11){
            return res.status(400).json({msg: "Número de celular incorreto!"})
        }
        // data de nascimento
        const [dia, mes, ano] = data_nascimento.split("/")
        const dataNascimento = new Date(`${ano}-${mes}-${dia}T00:00:00`)
        const dataAtual = new Date()  
        if(dataNascimento > dataAtual){
            return res.status(400).json({msg: "Data de nascimento inválida!"})
        }
        
        
        
        // salvando no banco
        const novoUsuario = await Usuario.create({
            nome, 
            email,
            senha: hashPassword,
            phone,
            data_nascimento: dataNascimento,
            role: 'Paciente'
        })
        return res.status(200).json(novoUsuario)
    } catch (error) {
        console.log("Erro ao cadastrar usuário => " + error)
        return res.status(500).json({msg: " Erro ao cadastrar usuário => " + error})
    }
}

// LOGIN 
export async function login(req,res){
    try {
        const {email, password} = req.body 
    
        if(!email || !password){
            return res.status(400).json({msg: "Preencha email e/ou senha para fazer o login"})
        } 

        // verifica se email existe
        const verificaUsuario = await Usuario.findOne({where: {email: email}})
        if(!verificaUsuario){
            return res.status(400).json({msg: "E-mail não encontrado!"})
        }

        // validar senha 
        const validarSenha = await bcrypt.compare(password, verificaUsuario.senha) 
        if(!validarSenha){
            return res.status(403).json({msg: "Senha incorreta."})
        }

        // inserir token 
        const SECRET = process.env.SECRET 
        const token =  jwt.sign(verificaUsuario.id, SECRET)
        return res.status(200).json({msg: "Usuário logado => " + token})
    } catch (error) {
         console.log("Erro ao fazer login => " + error)
        return res.status(500).json({msg: " Erro ao fazer login => " + error})
    }
}