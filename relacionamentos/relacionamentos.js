import Usuario from "../models/UsuarioModel.js";
import Agenda from "../models/AgendaModel.js";
import Medico from "../models/MedicoModel.js"
import Paciente from "../models/PacienteModel.js"
import Servico from "../models/ServicoModel.js";
import AgendaServico from "../models/AgendaServicoModel.js";
import Pagamento from "../models/PagamentoModel.js";

// Relacionamentos
Usuario.hasOne(Paciente, { foreignKey: "userId" });
Paciente.belongsTo(Usuario, { foreignKey: "userId" });

Usuario.hasOne(Medico, { foreignKey: "userId" });
Medico.belongsTo(Usuario, { foreignKey: "userId" });

Paciente.hasMany(Agenda, { foreignKey: "pacienteId" });
Agenda.belongsTo(Paciente, { foreignKey: "pacienteId" });

Medico.hasMany(Agenda, { foreignKey: "doctorId" });
Agenda.belongsTo(Medico, { foreignKey: "doctorId" });

Agenda.belongsToMany(Servico, { through: AgendaServico, foreignKey: "appointmentId" });
Servico.belongsToMany(Agenda, { through: AgendaServico, foreignKey: "serviceId" });

Agenda.hasOne(Pagamento, { foreignKey: "appointmentId" });
Pagamento.belongsTo(Agenda, { foreignKey: "appointmentId" });

