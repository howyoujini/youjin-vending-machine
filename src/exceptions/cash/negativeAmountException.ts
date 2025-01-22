import { CustomBusinessException } from "../customBusinessException";

/**
 * Exception for handling cases where a negative cash amount is inserted,
 * extending the `CustomBusinessException` class.
 */
export class NegativeAmountException extends CustomBusinessException {
  constructor() {
    super("Insert a positive amount of cash.");
    this.name = "NegativeAmountException";
  }
}
