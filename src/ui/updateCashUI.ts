export function updateCashUI(insertedCash: number, userTotalCash: number) {
  document.getElementById(
    "inserted-payment"
  )!.textContent = `${insertedCash} KRW`;
  document.getElementById("cash-balance")!.textContent = `${userTotalCash} KRW`;
}
