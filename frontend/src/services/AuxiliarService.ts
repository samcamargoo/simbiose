export function isDataValida(dataDeNascimento: string) {

  const nascimento = new Date(dataDeNascimento);

  if (isNaN(nascimento.getTime()) || nascimento > new Date()) {
    return false;
  }
  return true;
}
