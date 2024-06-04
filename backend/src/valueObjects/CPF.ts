class CPF {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error("CPF inválido");
    }
  }

  private isValid(cpf: string): boolean {
    return /^\d{11}$/.test(cpf);
  }

  getValue(): string {
    return this.value;
  }
}

export default CPF;
