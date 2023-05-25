let display = document.getElementById("display");
let currentNumber = "";
let currentOperation = "";

function updateDisplay() {
  let displayText = currentOperation + currentNumber;
  displayText = displayText.replace(/([\+\-\*\/÷×])/g, " $1 ");
  if (displayText === "") {
    displayText = "0";
  }
  display.innerText = displayText;
}
updateDisplay();

document.getElementById("clear").addEventListener("click", function () {
  currentNumber = "";
  currentOperation = "";
  updateDisplay();
});

document.getElementById("backspace").addEventListener("click", function () {
  if (currentNumber.length > 0) {
    currentNumber = currentNumber.slice(0, -1);
  } else if (currentOperation.length > 0) {
    if (currentOperation.match(/[\+\-\*\/÷×]$/)) {
      let match = currentOperation.match(/(\d+)[\+\-\*\/÷×]$/);
      if (match) {
        currentNumber = match[1];
        currentOperation = currentOperation.slice(0, -currentNumber.length - 1);
      } else {
        currentOperation = currentOperation.slice(0, -1);
      }
    } else {
      currentOperation = currentOperation.slice(0, -1);
    }
  }
  updateDisplay();
});

document.getElementById("div").addEventListener("click", function () {
  if (currentOperation === "" && currentNumber === "") {
    return;
  }
  if (currentNumber !== "") {
    currentOperation += currentNumber;
    currentNumber = "";
  }
  if (!currentOperation.match(/[\+\-\*\/÷×]-$/)) {
    if (currentOperation.match(/[\+\-\*\/÷×]$/)) {
      currentOperation = currentOperation.slice(0, -1) + "÷";
    } else {
      currentOperation += "÷";
    }
  }
  updateDisplay();
});

document.getElementById("porc").addEventListener("click", function () {
  if (currentOperation === "" && currentNumber === "") {
    return;
  }
  if (currentNumber !== "") {
    currentOperation += currentNumber;
    currentNumber = "";
  }
  if (!currentNumber.includes("%")) {
    if (currentOperation.match(/[\+\-\*\/÷×]$/)) {
      currentOperation = currentOperation.slice(0, -1) + "%";
    } else {
      currentOperation += "%";
    }
  }
  updateDisplay();
});

document.getElementById("mult").addEventListener("click", function () {
  if (currentOperation === "" && currentNumber === "") {
    return;
  }
  if (currentNumber !== "") {
    currentOperation += currentNumber;
    currentNumber = "";
  }
  if (!currentOperation.match(/[\+\-\*\/÷×]$/)) {
    currentOperation += "×";
  } else if (!currentOperation.match(/[\+\-\*\/÷×]-$/)) {
    currentOperation = currentOperation.slice(0, -1) + "×";
  }
  updateDisplay();
});

document.getElementById("mas").addEventListener("click", function () {
  if (currentOperation === "" && currentNumber === "") {
    return;
  }
  if (currentNumber !== "") {
    currentOperation += currentNumber;
    currentNumber = "";
  }
  if (!currentOperation.match(/[\+\-\*\/÷×]$/)) {
    currentOperation += "+";
  } else if (!currentOperation.match(/[\+\-\*\/÷×]-$/)) {
    currentOperation = currentOperation.slice(0, -1) + "+";
  }
  updateDisplay();
});

document.getElementById("menos").addEventListener("click", function () {
  if (currentOperation === "" && currentNumber === "") {
    return;
  }
  if (currentNumber !== "") {
    currentOperation += currentNumber;
    currentNumber = "";
  }
  if (currentOperation.match(/[\*\/÷×]$/)) {
    currentOperation += "-";
  } else if (currentOperation.match(/[\+\-]$/)) {
    currentOperation = currentOperation.slice(0, -1) + "-";
  } else if (!currentOperation.match(/\-$/)) {
    currentOperation += "-";
  }
  updateDisplay();
});

document.getElementById("punto").addEventListener("click", function () {
  if (currentNumber.indexOf(".") === -1) {
    currentNumber += ".";
    updateDisplay();
  }
});

function isValidExpression(expression) {
  if (expression.match(/[\+\*\/÷×]{2,}/) || expression.match(/\-\-+/)) {
    return false;
  }

  if (expression.match(/^[\+\*\/÷×]/) || expression.match(/[\+\-\*\/÷×%]$/)) {
    return false;
  }

  if (expression.match(/\([\+\*\/÷×]/)) {
    return false;
  }
  return true;
}

let previousOperation = "";

document.getElementById("equal").addEventListener("click", function () {
  let expression = (currentOperation + currentNumber)
    .replace(/÷/g, "/")
    .replace(/×/g, "*");
  expression = expression.replace(/(\d+)%/g, "($1/100)");
  if (isValidExpression(expression)) {
    let result = eval(expression).toString();
    previousOperation = currentOperation + currentNumber + "=" + result;
    currentNumber = result;
    currentOperation = "";
    updateDisplay();
  } else {
    display.innerHTML =
      '<span style="font-size: 24px;">Expresión inválida</span>';
  }
});

document.getElementById("op-anterior").addEventListener("click", function () {
  if (previousOperation !== "") {
    let match = previousOperation.match(/(.*)=(.*)/);
    if (match) {
      currentOperation = match[1];
      currentNumber = "";
      updateDisplay();
    }
  }
});

let numberButtons = document.getElementsByClassName("btn-number");
for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", function () {
    if (currentNumber.length < 15) {
      if (currentNumber === "0") {
        currentNumber = this.innerText;
      } else {
        currentNumber += this.innerText;
      }
      updateDisplay();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (
    localStorage.getItem("darkMode") === null ||
    localStorage.getItem("darkMode") === "true"
  ) {
    document.querySelector(".calc").classList.add("dark");
    document.querySelector("body").classList.add("dark");
  } else {
    document.querySelector(".calc").classList.remove("dark");
    document.querySelector("body").classList.remove("dark");
  }
});

document.querySelector(".light_sun").addEventListener("click", function () {
  document.querySelector(".calc").classList.remove("dark");
  document.querySelector("body").classList.remove("dark");
  localStorage.setItem("darkMode", "false");
});

document.querySelector(".dark_moon").addEventListener("click", function () {
  document.querySelector(".calc").classList.add("dark");
  document.querySelector("body").classList.add("dark");
  localStorage.setItem("darkMode", "true");
});
