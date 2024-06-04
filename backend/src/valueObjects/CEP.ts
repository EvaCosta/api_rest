class CEP {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error("CEP inválido");
    }
  }

  private isValid(cep: string): boolean {
    return /^\d{5}-\d{3}$/.test(cep);
  }

  getString(): string {
    return this.value;
  }
}

export default CEP;
