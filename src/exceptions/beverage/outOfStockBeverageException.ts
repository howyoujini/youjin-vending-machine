import { CustomBusinessException } from "../customBusinessException";

/**
 * Exception thrown when a requested beverage is out of stock.
 */
export class OutOfStockBeverageException extends CustomBusinessException {
  constructor(beverageName: string) {
    super(`${beverageName} is out of stock.`);
    this.name = "OutOfStockBeverageException";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
