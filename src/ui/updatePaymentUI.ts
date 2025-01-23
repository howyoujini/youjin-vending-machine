import { updateUI } from ".";
import { User } from "../models/user";
import { VendingMachine } from "../models/vendingMachine";
import { displayMessageUI } from "./displayMessageUI";

let countdownInterval: number | null = null;

export function updatePaymentUI(vendingMachine: VendingMachine, user: User) {
  const insertedPaymentElement = document.getElementById("inserted-payment")!;
  const paymentSubheading = document.querySelector(".subheading")!;
  const paymentMethod = user.getPaymentMethod();

  if (paymentMethod !== "card") {
    paymentSubheading.textContent = "Inserted Cash";
    insertedPaymentElement.textContent = `${vendingMachine.getInsertedCash()} KRW`;
    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  } else if (paymentMethod === "card") {
    paymentSubheading.textContent = "Card";

    let timer = 20;
    insertedPaymentElement.textContent = `${timer} sec`;

    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
    }

    countdownInterval = window.setInterval(() => {
      timer -= 1;
      if (timer > 0) {
        insertedPaymentElement.textContent = `${timer} sec`;
      } else {
        clearInterval(countdownInterval!);
        countdownInterval = null;
        displayMessageUI("Time expired. Card payment failed.");

        user.resetPaymentMethod();
        vendingMachine.setPaymentMethod("none");
        updateUI(vendingMachine, user);
      }
    }, 1000);
  }
}
