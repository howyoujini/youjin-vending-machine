import {
  BeverageNotFoundException,
  InsufficientCashForBeverageException,
  InvalidDenominationException,
  NegativeAmountException,
  OutOfStockBeverageException,
} from "../exceptions";
import { Denomination, KRW_DENOMINATIONS } from "../constants/denomination";
import { Beverage, beverages } from "./beverage";
import { states, VendingMachineState } from "./machineState";
import { PaymentMethod } from "./paymentMethod";

export class VendingMachine {
  private state: VendingMachineState;
  beverages: Beverage[];
  private insertedCash: number;
  private paymentMethod: PaymentMethod;

  constructor() {
    this.state = states.onSale;
    this.beverages = beverages;
    this.insertedCash = 0;
    this.paymentMethod = "none";
  }

  public getInsertedCash(): number {
    return this.insertedCash;
  }

  public insertCash(amount: number): void {
    if (!KRW_DENOMINATIONS.includes(amount as Denomination)) {
      if (amount <= 0) {
        throw new NegativeAmountException();
      }

      throw new InvalidDenominationException(amount);
    }

    this.insertedCash += amount;
    this.updateState();
  }

  public getState(): VendingMachineState {
    return this.state;
  }

  public setPaymentMethod(paymentMethod: PaymentMethod): void {
    this.paymentMethod = paymentMethod;
    this.updateState();
  }

  public dispenseBeverage(beverageId: string): Beverage {
    const beverage = this.getBeverageById(beverageId);

    this.validateBeverage(beverage);

    if (this.paymentMethod !== "card") {
      this.processCashPayment(beverage);
    }

    this.reduceStock(beverage);

    this.updateState();

    return beverage;
  }

  private getBeverageById(beverageId: string): Beverage {
    const beverage = this.beverages.find((bev) => bev.id === beverageId);
    if (!beverage) {
      throw new BeverageNotFoundException(beverageId);
    }
    return beverage;
  }

  private processCashPayment(beverage: Beverage): void {
    this.checkCash(beverage);
    this.insertedCash -= beverage.price;
  }

  private reduceStock(beverage: Beverage): void {
    beverage.stock--;
  }

  private validateBeverage(beverage: Beverage): void {
    if (beverage.stock <= 0) {
      throw new OutOfStockBeverageException(beverage.name);
    }
  }

  private checkCash(beverage: Beverage): void {
    if (this.insertedCash < beverage.price) {
      throw new InsufficientCashForBeverageException(beverage);
    }
  }

  public returnChange(): number {
    const change = this.insertedCash;
    this.insertedCash = 0;
    this.updateState();

    return change;
  }

  private updateState(): void {
    const totalStock = this.beverages.reduce(
      (total, drink) => total + drink.stock,
      0
    );

    if (totalStock === 0) {
      this.state = states.soldOut;
    } else {
      this.state = states.onSale;

      if (totalStock <= 5) {
        this.state = states.lowStock;
      }

      if (this.insertedCash > 0 || this.paymentMethod === "card") {
        this.state = states.awaitingSelection;
      }
    }
  }
}
