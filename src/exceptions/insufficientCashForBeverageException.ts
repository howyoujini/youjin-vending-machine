import { Beverage } from "../models/beverage";
import { CustomBusinessException } from "./customBusinessException";

/**
 * Exception thrown when the user does not have enough cash to purchase a selected beverage.
 * Includes details about the beverage and the shortfall.
 */
export class InsufficientCashForBeverageException extends CustomBusinessException {
  constructor(beverage: Beverage) {
    super(
      `Insufficient cash to buy ${beverage.icon}${beverage.name}.\nPlease insert MORE CASH to complete the purchase.
      `
    );
    this.name = "InsufficientCashForBeverageException";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
