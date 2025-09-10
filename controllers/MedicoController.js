import Medico from "../models/MedicoModel.js";

export async function cadastrarMedico(req,res) {
    try {
        const { crm, especialidade, nome } = req.body
        if (!nome) {
            return res.status(400).json({ msg: "Informe o nome do médico" })
        }

        const novoMedico = await Medico.create({
            crm, especialidade, nome
        })

        return res.status(200).json({msg: "Médico cadastrado => " , novoMedico})
    } catch (error) {
        console.log("Erro ao cadastrar medico => " , error)
        return res.status(500).json({msg:"Erro ao cadastrar medico => " , error })
    }
}