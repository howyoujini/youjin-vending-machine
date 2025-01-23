import { VendingMachineState } from "../models/machineState";

export function updateStateUI(state: VendingMachineState) {
  const stateElement = document.querySelector<HTMLSpanElement>(".state")!;
  stateElement.textContent = state.displayName;
  stateElement.className = `state ${state.id}`;
}
