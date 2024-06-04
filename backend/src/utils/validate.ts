import Email from "../valueObjects/Email";
import CPF from "../valueObjects/CPF";
import Telefone from "../valueObjects/Telefone";
import CEP from "../valueObjects/CEP";

export function validateValueObject(
  value: string,
  type: string,
): { valueObject: any; errorMessage?: string } {
  try {
    let valueObject;
    switch (type) {
      case "email":
        valueObject = new Email(value);
        break;
      case "cpf":
        valueObject = new CPF(value);
        break;
      case "telefone":
        valueObject = new Telefone(value);
        break;
      case "cep":
        valueObject = new CEP(value);
        break;
      default:
        throw new Error("Tipo de Value Object inválido");
    }
    return { valueObject };
  } catch (error) {
    return { valueObject: null, errorMessage: (error as Error).message };
  }
}
