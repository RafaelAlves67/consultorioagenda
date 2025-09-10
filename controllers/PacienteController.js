import Paciente from "../models/PacienteModel.js" 
import { validarCPF } from "../helpers/validateCPF.js"
import { validateCEP } from "../helpers/validateCEP.js"
import axios from 'axios'

export async function cadastrarPaciente(req,res){
    try {
         let {cpf, historico_medico, alergia, observacoes, cep, estado, cidade, endereco, numero, complemento} = req.body 

    if(!cpf){
        return res.status(400).json({msg: "Informe o CPF"})
    }

    if(!validarCPF(cpf)){
        return res.status(400).json({msg: "CPF inválido"})
    }

    // verifica se existe o cpf
    const verificaCPF = await Paciente.findOne({where: {cpf: cpf}})
    if(verificaCPF){
        return res.status(400).json({msg: "Paciente ja cadastrado!"})
    }

    if(!cep){
           if(!estado || !cidade || !endereco){
       return res.status(400).json({msg: "Informe os campos de endereço!"}) 
        }
    }else{
        if(!validateCEP(cep)){
             return res.status(400).json({msg: "CEP inválido"}) 
        }

        // requisição de API externa 
        const buscarCEP = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const dados = buscarCEP.data
        console.log(dados)
        estado = dados.estado 
        cidade = dados.localidade 
        endereco = dados.logradouro 
        complemento = dados.complemento
    }
 

    const novoPaciente = await Paciente.create({
        cpf, historico_medico, alergia, observacoes, estado, cidade, endereco, complemento, numero
    })

    return res.status(200).json(novoPaciente)
    } catch (error) {
        console.log("Erro ao cadastrar paciente => " + error)
        return res.status(500).json({msg:"Erro ao cadastrar paciente => " + error })
    }
}