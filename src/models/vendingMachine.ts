import {
  InvalidDenominationException,
  NegativeAmountException,
} from "@exceptions";
import { Denomination, KRW_DENOMINATIONS } from "../constants/denomination";
import { Beverage, beverages } from "./beverage";
import { states, VendingMachineState } from "./machineState";

export class VendingMachine {
  private state: VendingMachineState;
  beverages: Beverage[];
  private insertedCash: number;

  constructor() {
    this.state = states["on-sale"];
    this.beverages = beverages;
    this.insertedCash = 0;
  }

  public getInsertedCash() {
    return this.insertedCash;
  }

  public insertCash(amount: number): void {
    if (!KRW_DENOMINATIONS.includes(amount as Denomination)) {
      if (amount <= 0) {
        throw new NegativeAmountException();
      }

      throw new InvalidDenominationException(amount);
    }

    if (amount <= 0) {
      throw new NegativeAmountException();
    }

    this.insertedCash += amount;
    this.updateState();
  }

  public getState(): VendingMachineState {
    return this.state;
  }

  private updateState(): void {
    if (this.insertedCash > 0) {
      this.state = states["pending"];
    }
  }
}
