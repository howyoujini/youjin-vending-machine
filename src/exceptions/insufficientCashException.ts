import { CustomBusinessException } from "./customBusinessException";

/**
 * Exception for handling cases where the user does not have enough cash to complete a transaction,
 * extending the `CustomBusinessException` class.
 */
export class InsufficientCashException extends CustomBusinessException {
  constructor() {
    super("You do not have enough cash available.");
    this.name = "InsufficientCashException";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
