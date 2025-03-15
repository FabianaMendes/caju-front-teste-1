export function onlyDigits(s: string) {
  return s.replace(/[^\d]/g, '')
}

export function isValidCpf(value: string | undefined) {
  if (!value) return false
  const cpf = onlyDigits(value)
  let remainder
  let sum
  let i
  if (cpf.length !== 11
    || cpf === '00000000000'
    || cpf === '11111111111'
    || cpf === '22222222222'
    || cpf === '33333333333'
    || cpf === '44444444444'
    || cpf === '55555555555'
    || cpf === '66666666666'
    || cpf === '77777777777'
    || cpf === '88888888888'
    || cpf === '99999999999') {
    return false
  }
  sum = 0
  for (i = 0; i < 9; i += 1) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  remainder = 11 - (sum % 11)
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.charAt(9))) return false
  sum = 0
  for (i = 0; i < 10; i += 1) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  remainder = 11 - (sum % 11)
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cpf.charAt(10))) {
    return false
  }
  return true
}

export function applyCpfMask(cpf: string) {
  const cleanValue = cpf.replace(/\D/g, '');

  const firstPart = cleanValue.substring(0, 3);
  const secondPart = cleanValue.substring(3, 6);
  const thirdPart = cleanValue.substring(6, 9);
  const fourthPart = cleanValue.substring(9, 11);

  const formattedCpf = `${firstPart ? firstPart : ''}${secondPart ? `.${secondPart}` : ''}${
    thirdPart ? `.${thirdPart}` : ''
  }${fourthPart ? `-${fourthPart}` : ''}`;

  return formattedCpf;
}

export const formatDate = (dateString?: string): string => {
  if (!dateString) return ''
  const parts = dateString.split('-');
  const day = String(parts[2]).padStart(2, '0');
  const month = String(parts[1]).padStart(2, '0');
  const year = String(parts[0]);
  return `${day}/${month}/${year}`;
};

export const emailValidationRegex = new RegExp(/^[a-zA-Z0-9\\+\\.\\_\\%\\+\\-]{1,256}@[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}(?:\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+/)
export const fullNameValidationRegex = new RegExp('[\\wà-úÀ-Ú]+\\s[\\wà-úÀ-Ú]')

export function isProductionEnv() {
  return process.env.NODE_ENV !== 'development'
}