class Telefone {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error("Telefone inválido");
    }
  }

  private isValid(telefone: string): boolean {
    return /^\d{10,11}$/.test(telefone);
  }

  getValue(): string {
    return this.value;
  }
}

export default Telefone;
