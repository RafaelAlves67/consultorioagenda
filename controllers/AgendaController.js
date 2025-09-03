import Servico from "../models/ServicoModel.js"
import Agenda from "../models/AgendaModel.js"
import Medico from "../models/MedicoModel.js"
import Paciente from "../models/PacienteModel.js"
import { Op } from "sequelize"
import AgendaServico from "../models/AgendaServicoModel.js"

export async function cadastrarAgenda(req,res){

    try {
        const {data_hora_inicio, data_hora_fim, status, observacoes, id_servico, id_paciente, id_medico, quantidade, valor} = req.body 

        if(!data_hora_inicio || !data_hora_fim || !id_servico || !id_paciente || !id_medico || !quantidade || !valor){
            return res.status(400).json({msg: "Prencha os campos corretamente para realizar o agendamento!"})
        }  
        
        // VERIFICAR EXISTENCIA DOS id 
        const verificarServico = await Servico.findByPk(id_servico)
        if(!verificarServico){
            return res.status(400).json({msg: "Serviço não encontrado!"})
        }

        const verificarMedico = await Medico.findByPk(id_medico)
        if(!verificarMedico){
            return res.status(400).json({msg: "Medico não encontrado!"})
        }

        const verificarPaciente = await Paciente.findByPk(id_paciente)
        if(!verificarPaciente){
            return res.status(400).json({msg: "Paciente não encontrado!"})
        }

        if(quantidade === 0 || valor === 0){
            return res.status(400).json({msg: "O valor de quantidade/Valor não pode ser 0"})
        }

        // Horario de funcionamento
        const agendaFuncionamento = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
            '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
        
        // VALIDAÇÕES 

        // INICIO
        const dateformatInicio = new Date(data_hora_inicio)
        const diaInicio = data_hora_inicio.split(" ")[0]
        const horaMinutoInicio =  data_hora_fim.split(" ")[1]
        const horaMinutoFormatInicio = horaMinutoInicio.split(":").slice(0,2).join(":")

        // FIM 
        const diaFim = data_hora_fim.split(" ")[0]
        const horaMinutoFim =  data_hora_fim.split(" ")[1]
        const horaMinutoFormatFim = horaMinutoFim.split(":").slice(0,2).join(":") // 08:00

        for(let a of agendaFuncionamento){
            if(horaMinutoFormatInicio !== a || horaMinutoFormatFim !== a){
                return res.status(400).json({msg: "Horário inválido"})
            }
        }

        // VERIFICAR SABADO E DOMINGO
        const dataInicio = new Date(data_hora_inicio)
        const dataFim = new Date(data_hora_fim)
        const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
        const nomeDiaSemanaInicio = dias[dataInicio.getDay()]
        const nomeDiaSemanaFim = dias[dataFim.getDay()]

        if(nomeDiaSemanaFim === 'Domingo' || nomeDiaSemanaInicio === 'Domingo'){
            return res.status(400).json({msg: "Não trabalhamos aos domingos!"})
        }

        if(nomeDiaSemanaFim === 'Sábado' || nomeDiaSemanaInicio === 'Sábado'){
            if(horaMinutoFormatFim > agendaFuncionamento[4] || horaMinutoFormatInicio > agendaFuncionamento[4]){
                return res.status(400).json({msg: "Aos sábados o consultorio funciona até 12:00"})
            }
        }

        // VERIFICAR SE EXISTE agenda marcada ja para dia e horario
        const verificaAgenda = await Agenda.findOne({where: {
            [Op.or]: [
                {data_hora_inicio: data_hora_inicio },
                {data_hora_fim: data_hora_fim}
            ]
        }})

        if(verificaAgenda){
            return res.status(400).json({msg: "Horario já está agendado!"})
        }

        const novaAgenda = await Agenda.create({
            data_hora_inicio, data_hora_fim, status, observacoes, id_medico, id_paciente, id_servico
        })

        const novaAgendaServico = await AgendaServico.create({
            quantidade: quantidade,
            valor_total: valor * quantidade,
            id_agenda: id_agenda
        })

        return res.status(200).json({msg: "Consulta agendada", novaAgenda, novaAgendaServico})

        





    } catch (error) {
                console.log("Erro ao cadastrar agenda => " , error)
        return res.status(500).json({msg:"Erro ao cadastrar agenda => " , error })
    }    
}


