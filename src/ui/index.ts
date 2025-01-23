import { User } from "../models/user";
import { VendingMachine } from "../models/vendingMachine";
import { updateBeveragesUI } from "./updateBeveragesUI";
import { updateCashUI } from "./updateCashUI";
import { updatePaymentUI } from "./updatePaymentUI";
import { updatePurchaseHistoryUI } from "./updatePurchaseHistoryUI";
import { updateStateUI } from "./updateStateUI";

export function updateUI(vendingMachine: VendingMachine, user: User) {
  updateStateUI(vendingMachine.getState());
  updateCashUI(vendingMachine.getInsertedCash(), user.getTotalCash());
  updateBeveragesUI(vendingMachine.beverages);
  updatePurchaseHistoryUI(vendingMachine.beverages);
  updatePaymentUI(vendingMachine, user);
}
