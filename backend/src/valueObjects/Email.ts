class Email {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error("Email inválido");
    }
  }

  private isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getValue(): string {
    return this.value;
  }
}

export default Email;
