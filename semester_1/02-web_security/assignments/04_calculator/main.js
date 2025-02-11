class Calculator {
  constructor() {
    this.displayElement = document.querySelector(".input");
    this.historyListElement = document.querySelector(".history-list");
    this.isHistoryCleared = true;
    this.currentInput = "0";
    this.previousInput = "";
    this.operator = null;
  }

  reset() {
    this.currentInput = "0";
    this.previousInput = "";
    this.operator = null;
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.textContent = this.currentInput;
  }

  appendNumber(number) {
    if (this.currentInput === "0" && number !== ".") {
      this.currentInput = number;
    } else if (number === "." && this.currentInput.includes(".")) {
      return;
    } else {
      this.currentInput += number;
    }
    this.updateDisplay();
  }

  delete() {
    this.currentInput = this.currentInput.slice(0, -1) || "0";
    this.updateDisplay();
  }

  toggleSign() {
    if (this.currentInput === "0") return;
    this.currentInput = (parseFloat(this.currentInput) * -1).toString();
    this.updateDisplay();
  }

  chooseOperator(operator) {
    if (this.currentInput === "") return;
    if (this.previousInput !== "") {
      this.compute();
    }
    this.operator = operator;
    this.previousInput = this.currentInput;
    this.currentInput = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operator) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = current !== 0 ? prev / current : "Error";
        break;
      case "%":
        computation = prev % current;
        break;
      default:
        return;
    }

    this.addHistory(`${prev} ${this.operator} ${current} = ${computation}`);
    this.currentInput = computation.toString();
    this.previousInput = "";
    this.operator = null;
    this.updateDisplay();
  }

  addHistory(entry) {
    this.isHistoryCleared = false;
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = entry;
    if (!this.isHistoryCleared) {
      document.querySelector(".text-muted").remove();
    }
    this.historyListElement.prepend(li);

    if (this.historyListElement.children.length > 10) {
      this.historyListElement.removeChild(this.historyListElement.lastChild);
    }
  }

  clearHistory() {
    this.historyListElement.innerHTML =
      '<li class="list-group-item text-muted">No history</li>';
    this.isHistoryCleared = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Sidebar Toggle
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Calculator
  const calculator = new Calculator();

  document.querySelectorAll("[data-number]").forEach((button) => {
    button.addEventListener("click", () =>
      calculator.appendNumber(button.textContent)
    );
  });

  document.querySelectorAll("[data-operator]").forEach((button) => {
    button.addEventListener("click", (e) => {
      calculator.chooseOperator(button.textContent);
    });
  });

  document
    .querySelector("[data-equal]")
    .addEventListener("click", () => calculator.compute());
  document
    .querySelector("[data-reset]")
    .addEventListener("click", () => calculator.reset());
  document
    .querySelector("[data-del]")
    .addEventListener("click", () => calculator.delete());
  document
    .querySelector("[data-sign]")
    .addEventListener("click", () => calculator.toggleSign());
  document
    .querySelector("[data-clear-history]")
    .addEventListener("click", () => calculator.clearHistory());
});
