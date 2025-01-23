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
`;

export const beverageButtons = document.querySelectorAll<HTMLButtonElement>(
  "#beverages .beverage"
);
beverageButtons.forEach((button) => {
  button.addEventListener("click", () => controller.selectBeverage(button.id));
});
