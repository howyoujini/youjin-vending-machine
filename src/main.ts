import { TransactionController } from "./controller/transaction";
import { User } from "./models/user";
import { VendingMachine } from "./models/vendingMachine";

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
  </div>
`;
