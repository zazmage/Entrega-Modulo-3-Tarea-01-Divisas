// Fill the content of the selection lists with the given currency array
const fillSelectBox = (list, id) => {
  let selectBox = document.getElementById(id);
  let fragment = document.createDocumentFragment();
  list.forEach((i) => {
    let currency = document.createElement("option");
    currency.value = i;
    currency.innerHTML = i;
    fragment.appendChild(currency);
  });
  selectBox.appendChild(fragment);
};

// Returns a string of plural text
const pluralizeText = (text) => {
  let textList = text.split(" ");
  let finalText = "";
  textList.forEach((i) => {
    if (i.slice(-1) === "r") {
      finalText += i + "es ";
    } else {
      finalText += i + "s ";
    }
  });
  finalText = finalText.slice(0, -1);
  return finalText;
};

// Perform error handling and call the addMessage function
const currencyExchange = () => {
  let currency1 = document.getElementById("select-box-1").value;
  let currency2 = document.getElementById("select-box-2").value;
  let amount = document.getElementById("amount-text-box").value;
  let exchange;
  currencyPairs.forEach((i) => {
    if (i[0] === currency1 && i[1] === currency2) {
      exchange = (i[2] * amount).toFixed(2);
    }
  });
  if (currency1 !== "Elige tu moneda" && currency2 !== "Elige tu moneda") {
    if (amount) {
      if (exchange > 0) {
        addMessage(
          "result",
          `${amount} ${pluralizeText(
            currency1
          )} son ${exchange} ${pluralizeText(currency2)}`
        );
      } else {
        addMessage("error", "Ingrese un número mayor que 0");
      }
    } else {
      addMessage("error", "Ingrese un número");
    }
  } else {
    addMessage("error", "Seleccione una moneda en cada cuadro");
  }
};

// Add a message to the page as an HTML object.
// Create the button "cleanButton", which deletes the previous message.
const addMessage = (type, text) => {
  let messageBox = document.getElementById("result-box");
  let message = document.createElement("p");
  let cleanButton = document.createElement("input");
  messageBox.hidden = false;
  message.setAttribute("class", "message-text");
  cleanButton.setAttribute("type", "button");
  cleanButton.setAttribute("class", "clean-button");
  cleanButton.value = "Borrar historial";

  if (type === "result") {
    message.innerHTML = text;
  } else {
    message.innerHTML = text;
  }
  messageBox.appendChild(message);

  let previousButton = messageBox.getElementsByClassName("clean-button")[0];
  if (previousButton) {
    messageBox.removeChild(previousButton);
  }
  messageBox.appendChild(cleanButton);
  cleanButton.addEventListener("click", function () {
    let eraseMessages = document.getElementsByClassName("message-text");
    while (eraseMessages.length > 0) {
      messageBox.removeChild(eraseMessages[0]);
    }
    messageBox.removeChild(cleanButton);
    messageBox.hidden = true;
  });
};

// Main currency array.
let moneda = [
  "Elige tu moneda",
  "Dolar",
  "Peso Mexicano",
  "Peso Colombiano",
  "Euro",
  "Libra Esterlina",
];

// Currency pair values array.
let currencyPairs = [
  ["Dolar", "Dolar", 1],
  ["Dolar", "Peso Mexicano", 19.97],
  ["Dolar", "Peso Colombiano", 3879],
  ["Dolar", "Euro", 0.85],
  ["Dolar", "Libra Esterlina", 0.73],

  ["Peso Mexicano", "Dolar", 0.05],
  ["Peso Mexicano", "Peso Mexicano", 1],
  ["Peso Mexicano", "Peso Colombiano", 194.39],
  ["Peso Mexicano", "Euro", 0.043],
  ["Peso Mexicano", "Libra Esterlina", 0.036],

  ["Peso Colombiano", "Dolar", 0.00026],
  ["Peso Colombiano", "Peso Mexicano", 0.0052],
  ["Peso Colombiano", "Peso Colombiano", 1],
  ["Peso Colombiano", "Euro", 0.00022],
  ["Peso Colombiano", "Libra Esterlina", 0.00019],

  ["Euro", "Dolar", 1.17],
  ["Euro", "Peso Mexicano", 23.41],
  ["Euro", "Peso Colombiano", 4538.43],
  ["Euro", "Euro", 1],
  ["Euro", "Libra Esterlina", 0.85],

  ["Libra Esterlina", "Dolar", 1.38],
  ["Libra Esterlina", "Peso Mexicano", 27.5],
  ["Libra Esterlina", "Peso Colombiano", 5333.12],
  ["Libra Esterlina", "Euro", 1.18],
  ["Libra Esterlina", "Libra Esterlina", 1],
];

// Function calls.

fillSelectBox(moneda, "select-box-1");
fillSelectBox(moneda, "select-box-2");

document
  .getElementById("convert-button")
  .addEventListener("click", currencyExchange);
