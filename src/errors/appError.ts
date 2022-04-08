class AppError {
  public readonly message: string | Array<string>;
  public readonly status: number;

  constructor(message: string | Array<string>, status = 400) {
    this.message = message;
    this.status = status;
  }
}

export default AppError;
