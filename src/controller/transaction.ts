import { Denomination } from "../models/denomination";
import { CustomBusinessException } from "../exceptions";
import { VendingMachineState } from "../models/machineState";
import { User } from "../models/user";
import { VendingMachine } from "../models/vendingMachine";
import { updateUI } from "../ui";
import { displayMessageUI } from "../ui/displayMessageUI";
import { resetMessageUI } from "../ui/resetMessageUI";

export class TransactionController {
  private user: User;
  private vendingMachine: VendingMachine;

  constructor(user: User, vendingMachine: VendingMachine) {
    this.user = user;
    this.vendingMachine = vendingMachine;
  }

  public selectBeverage(beverageId: string) {
    this.updateView(() => {
      const beverage = this.vendingMachine.beverages.find(
        (beverage) => beverage.id === beverageId
      );
      if (beverage) {
        this.vendingMachine.setPaymentMethod(this.user.getPaymentMethod());
        this.vendingMachine.dispenseBeverage(beverage.id);
      }
    });
  }

  public purchaseWithCash(amount: Denomination): void {
    this.updateView(() => {
      this.user.payWithCash(amount);
      this.vendingMachine.insertCash(amount);
    });
  }

  public purchaseWithCard() {
    this.updateView(() => {
      this.user.payWithCard();

      const paymentMethod = this.user.getPaymentMethod();
      this.vendingMachine.setPaymentMethod(paymentMethod);

      const change = this.vendingMachine.returnChange();
      this.user.haveCashesBack(change);
    });
  }

  public resetPaymentMethod(): void {
    this.user.resetPaymentMethod();
    this.vendingMachine.setPaymentMethod("none");
  }

  public returnChangeFromMachine(): void {
    this.updateView(() => {
      const change = this.vendingMachine.returnChange();
      this.user.haveCashesBack(change);
    });
  }

  public getMachineState(): VendingMachineState {
    return this.vendingMachine.getState();
  }

  public getUserCash(): number {
    return this.user.getTotalCash();
  }

  public getInsertedCash(): number {
    return this.vendingMachine.getInsertedCash();
  }

  private updateView(callback: () => void): void {
    resetMessageUI();

    try {
      callback();
    } catch (error) {
      if (error instanceof CustomBusinessException) {
        displayMessageUI(error.message);
      }
    }

    updateUI(this.vendingMachine, this.user);
  }
}
