import { beverageButtons } from "../main";
import { Beverage } from "../models/beverage";

export function updateBeveragesUI(beverages: Beverage[]) {
  beverageButtons.forEach((button) => {
    const beverageId = button.id;
    const beverage = beverages.find((b) => b.id === beverageId);

    if (beverage) {
      const stockElement = button.querySelector<HTMLElement>(".stock");
      if (beverage.stock <= 0) {
        if (stockElement) stockElement.remove();
        button.classList.add("unavailable");
      } else {
        if (!stockElement) {
          const newStockElement = document.createElement("div");
          newStockElement.className = "stock";
          newStockElement.textContent = `${beverage.stock}`;
          button.appendChild(newStockElement);
        } else {
          stockElement.textContent = `${beverage.stock}`;
        }
        button.classList.remove("unavailable");
      }
    }
  });
}
