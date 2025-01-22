import {
  InsufficientCashException,
  NegativeAmountException,
} from "../exceptions";
import { PaymentMethod } from "./paymentMethod";

const INITIAL_CASH_BALANCE = 30000;

export class User {
  private cash: number;
  private paymentMethod: PaymentMethod;

  constructor(initialCash?: number) {
    this.cash = initialCash ?? INITIAL_CASH_BALANCE;
    this.paymentMethod = "none";
  }

  resetPaymentMethod(): void {
    this.paymentMethod = "none";
  }

  getPaymentMethod(): PaymentMethod {
    return this.paymentMethod ?? "none";
  }

  payWithCash(amount: number): void {
    this.paymentMethod = "cash";

    if (amount <= 0) {
      throw new NegativeAmountException();
    }

    if (amount > this.cash) {
      throw new InsufficientCashException();
    }

    this.cash -= amount;
  }

  haveCashesBack(amount: number): void {
    if (amount < 0) {
      throw new NegativeAmountException();
    }

    this.cash += amount;
  }

  payWithCard(): void {
    this.paymentMethod = "card";
  }

  getTotalCash(): number {
    return this.cash;
  }
}
