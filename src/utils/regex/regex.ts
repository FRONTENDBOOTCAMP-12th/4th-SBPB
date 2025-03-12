export function emailReg(email: string) {
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/i;

  return emailReg.test(email);
}

export function idReg(id: string) {
  const idReg = /^[0-9a-zA-Z]{8,}$/;

  return idReg.test(id);
}

export function pwReg(password: string) {
  const pwReg = /^(?=.*[@!~*])[0-9a-zA-Z@!~*]{8,}$/;

  return pwReg.test(password);
}
