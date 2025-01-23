import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Vending Machine</h1>
    <p>Hey there! Select your drink – <b>Cola, Water, or Coffee</b> – with <b>KRW</b> only!</p>
    <p id="message" class="message"></p>
  </div>
`;
