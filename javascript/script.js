// Round a number
const roundNumber = (num, decimals) => {
  let fpoint = parseInt("1" + "0".repeat(decimals));
  return Math.round((num + Number.EPSILON) * fpoint) / fpoint;
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

// Correctly create the api url depending on the selected currencies
const getApiUrl = (currency1, currency2) => {
  const currencyAcronymArray = [
    ["Dolar", "USD"],
    ["Peso Mexicano", "MXN"],
    ["Peso Colombiano", "COP"],
    ["Euro", "EUR"],
    ["Libra Esterlina", "GBP"],
  ];
  let currencyAcronym1;
  let currencyAcronym2;
  currencyAcronymArray.forEach((i) => {
    if (i[0] === currency1) {
      currencyAcronym1 = i[1];
    }
    if (i[0] === currency2) {
      currencyAcronym2 = i[1];
    }
  });
  return [
    currencyAcronym1 + "_" + currencyAcronym2,
    "https://free.currconv.com/api/v7/convert?q=" +
      currencyAcronym1 +
      "_" +
      currencyAcronym2 +
      "&compact=ultra&apiKey=38f39210efb5ed84ff62",
  ];
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

// Main function, makes requests to the currency pairs api, the currency conversion calculation and calls the relevant functions to display results on the screen.
async function currencyExchange() {
  const currency1 = document.querySelector("#select-box-1").value;
  const currency2 = document.querySelector("#select-box-2").value;
  const amount = document.querySelector("#amount-text-box").value;
  const apiUrl = getApiUrl(currency1, currency2);

  if (currency1 !== "Elige tu moneda" && currency2 !== "Elige tu moneda") {
    if (amount) {
      if (amount > 0) {
        try {
          let res = await fetch(apiUrl[1]),
            json = await res.json();
          let exchange = roundNumber(json[apiUrl[0]] * amount, 2);
          addMessage(
            "result",
            `${amount} ${pluralizeText(
              currency1
            )} son ${exchange} ${pluralizeText(currency2)}`
          );

          // Api conection error handling
          if (!res.ok) throw { status: res.status, statusText: res.statusText };
        } catch (err) {
          console.log(err);
          let message = err.statusText || "Ocurrió un error";
          addMessage("error", message);
        } finally {
          console.log("Operación finalizada");
        }
      } else {
        addMessage("error", "Ingrese un número mayor que 0");
      }
    } else {
      addMessage("error", "Ingrese un número");
    }
  } else {
    addMessage("error", "Seleccione una moneda en cada cuadro");
  }
}

// Main currency array.
let moneda = [
  "Elige tu moneda",
  "Dolar",
  "Peso Mexicano",
  "Peso Colombiano",
  "Euro",
  "Libra Esterlina",
];

// Function calls.
fillSelectBox(moneda, "select-box-1");
fillSelectBox(moneda, "select-box-2");

document
  .getElementById("convert-button")
  .addEventListener("click", currencyExchange);
