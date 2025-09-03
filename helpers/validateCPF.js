export function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove não numéricos

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false; // inválido se tamanho errado ou repetido
  }

  // Primeiro dígito
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  let dig1 = resto < 2 ? 0 : 11 - resto;
  if (dig1 !== parseInt(cpf.charAt(9))) return false;

  // Segundo dígito
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  let dig2 = resto < 2 ? 0 : 11 - resto;
  if (dig2 !== parseInt(cpf.charAt(10))) return false;

  return true;
}
