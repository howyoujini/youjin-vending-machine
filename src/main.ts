import { Denomination, KRW_DENOMINATIONS } from "./constants/denomination";
import { TransactionController } from "./controller/transaction";
import { User } from "./models/user";
import { VendingMachine } from "./models/vendingMachine";
import "./style/index.css";

const user = new User();
const vendingMachine = new VendingMachine();

const controller = new TransactionController(user, vendingMachine);

const app = document.querySelector<HTMLDivElement>("#app")!;
const machineState = controller.getMachineState();
app.innerHTML = `
  <div class="margin">
    <span class="state ${machineState.id}">
      ${machineState.displayName}
    </span>
    <h1>Vending Machine</h1>
    <p>Hey there! Select your drink – <b>Cola, Water, or Coffee</b> – with <b>KRW</b> only!</p>
    <p id="message" class="message"></p>
    <p class="subheading">Inserted Cash</p>
    <p id="inserted-payment" class="bold-content">${controller.getInsertedCash()} KRW</p>
    <button id="return-change">Return Change</button>
    <div id="beverages">
      ${vendingMachine.beverages
        .map(
          (beverage) => `
        <button id=${beverage.id} class="no-margin-bottom beverage-wrapper beverage">
          <div class="padding beverage-button">
            <h1>${beverage.icon}</h1>
            <h3>${beverage.name}</h3>
            <p class="price">${beverage.price} KRW</p>
          </div>
          <div class="stock">${beverage.stock}</div>
        </button>
      `
        )
        .join("")}
    </div>
  </div>

  <div class="user">
    <p class="subheading">Cash on hand</p>
    <p id="cash-balance" class="bold-content">${controller.getUserCash()} KRW</p>
    <p class="subheading">Purchase History</p>
    <ul id="purchase-history"></ul>
    <div class="payment">
      <div class="cash" id="cash-buttons">
        ${KRW_DENOMINATIONS.map(
          (amount) => `
          <img id="${amount}KRW" class="units" src="assets/${amount}KRW.svg" alt="${amount} KRW"/>
        `
        ).join("")}
      </div>
      <img id="card-payment" class="units" src="assets/card.svg" alt="card" />
    </div>
  </div>
`;

export const beverageButtons = document.querySelectorAll<HTMLButtonElement>(
  "#beverages .beverage"
);
beverageButtons.forEach((button) => {
  button.addEventListener("click", () => controller.selectBeverage(button.id));
});

const cashButtons =
  document.querySelectorAll<HTMLImageElement>("#cash-buttons img");
cashButtons.forEach((button) => {
  const amount = parseInt(button.id.replace("KRW", ""), 10);
  button.addEventListener("click", () =>
    controller.purchaseWithCash(amount as Denomination)
  );
});

const cardPaymentButton = document.getElementById("card-payment")!;
cardPaymentButton.addEventListener("click", () =>
  controller.purchaseWithCard()
);

const returnChangeButton = document.getElementById("return-change")!;
returnChangeButton.addEventListener("click", () =>
  controller.returnChangeFromMachine()
);
