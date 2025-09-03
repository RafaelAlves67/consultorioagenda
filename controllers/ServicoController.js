import Servico from "../models/ServicoModel.js";

export async function cadastrarServico(req,res){
    try {
    const {nome, descricao, duracao_minutos, valor} = req.body 

    if(!nome || !duracao_minutos || !valor){
        return res.status(400).json({msg: "Informe um campos para cadastro de serviço"})
    }  
    
    const valorFloat = parseFloat(valor)
    const novoServico = await Servico.create({nome, descricao, duracao_minutos, valor: valorFloat})
    return res.status(200).json(novoServico)
    } catch (error) {
        console.log("Erro na rota de cadastrar servico => ", error)
        return res.status(500).json({msg: "Erro na rota de cadastrar servico => ", error})
    }
}

export async function editarServico(req,res){
    try {
        const {nome, descricao, duracao_minutos, valor} = req.body 
        const {id} = req.params

        if(!nome || !duracao_minutos || !valor || !id){
        return res.status(400).json({msg: "Informe um campos para cadastro de serviço"})
    }  

        // verifica existencia serviço
        const servico = await Servico.findByPk(id)
        if(!servico){
            return res.status(400).json({msg: "Serviço inválido"})
        }
        const valorFloat = parseFloat(valor)

        // update 
        servico.nome = nome;
        servico.descricao = descricao 
        servico.duracao_minutos = valorFloat 
        servico.duracao_minutos = duracao_minutos
        servico.save()
        return res.status(200).json(servico)
    } catch (error) {
        console.log("Erro na rota de editar servico => ", error)
        return res.status(500).json({msg: "Erro na rota de editar servico => ", error})
    } 
}

export async function deletarServico(req,res){
    try {
         const {id} = req.params 
    
        if(!id){
            return res.status(400).json({msg: "Sem id para deletar serviço!"})
        }   

        await Servico.destroy({where: {id: id}})
        return res.status(201).json({msg: `id ${id} do serviço deletado.`})
    } catch (error) {
        console.log("Erro na rota de editar servico => ", error)
        return res.status(500).json({msg: "Erro na rota de editar servico => ", error})        
    }
}

export async function listarServico(req,res){
    try {
        const servicos = await Servico.findAll()
        if(servicos.length === 0){
            return res.status(400).json({msg: "Nenhum serviço cadastrado"})
        }

        return res.status(200).json(servicos)
    } catch (error) {
        console.log("Erro na rota de listar servicos => ", error)
        return res.status(500).json({msg: "Erro na rota de listar servicos => ", error})  
    }
}