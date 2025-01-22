/**
 * A base class for custom business logic exceptions, extending the native `Error` class.
 */
export class CustomBusinessException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomBusinessException";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
