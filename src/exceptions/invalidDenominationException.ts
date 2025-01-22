import { CustomBusinessException } from "./customBusinessException";

/**
 * Exception for invalid currency denominations when a user inserts an invalid denomination into a vending machine, extending the `CustomBusinessException` class.
 */
export class InvalidDenominationException extends CustomBusinessException {
  constructor(amount: number) {
    super(`${amount} won is NOT a valid denomination.`);
    this.name = "InvalidDenominationError";
  }
}
