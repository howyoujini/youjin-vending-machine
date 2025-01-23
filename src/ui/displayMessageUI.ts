export function displayMessageUI(message: string) {
  const messageElement = document.getElementById("message")!;
  messageElement.textContent = message;
}
