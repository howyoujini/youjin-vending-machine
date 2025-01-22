import { CustomBusinessException } from "./customBusinessException";

/**
 * Exception thrown when the requested beverage is not found in the vending machine.
 */
export class BeverageNotFoundException extends CustomBusinessException {
  constructor(beverageId: string) {
    super(`Beverage with ID ${beverageId} is not found.`);
    this.name = "BeverageNotFoundException";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
