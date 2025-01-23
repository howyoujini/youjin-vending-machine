import { Beverage } from "../models/beverage";

const INITIAL_STOCK = 10;

export function updatePurchaseHistoryUI(beverages: Beverage[]) {
  const purchaseHistory = document.getElementById("purchase-history")!;
  purchaseHistory.innerHTML = beverages
    .filter((beverage) => beverage.stock < INITIAL_STOCK)
    .map(
      (beverage) =>
        `<li>${beverage.icon} ${beverage.name} <b>${
          INITIAL_STOCK - beverage.stock
        }</b> purchased (${
          beverage.price * (INITIAL_STOCK - beverage.stock)
        })</li>`
    )
    .join("");
}
