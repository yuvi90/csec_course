class Calculator {
    constructor() {
        this.inputText = document.querySelector(".input");
        this.resetBtn = document.querySelector("[data-reset]");
        this.delBtn = document.querySelector("[data-del]");
        this.signBtn = document.querySelector("[data-sign]");
        this.equalBtn = document.querySelector("[data-equal]");
        this.operatorBtn = document.querySelectorAll("[data-operator]");
        this.numBtn = document.querySelectorAll("[data-number]");
        this.previousOperand = null;
        this.currentOperand = null;
        this.currentOperation = null;
        this.IsOperatorClicked = null;
        this.IsEqualClicked = null;
    }

    compute(operator, input1, input2) {
        switch (operator) {
            case '+':
                return Number(input1) + Number(input2);
            case '-':
                return Number(input1) - Number(input2);
            case '*':
                return Number(input1) * Number(input2);
            case '/':
                return Number(input1) / Number(input2);
            default:
                return;
        }
    }

    reset() {
        this.inputText.innerText = '0';
        this.previousOperand = null;
        this.currentOperand = null;
        this.currentOperation = null;
        this.IsOperatorClicked = null;
        this.IsEqualClicked = null;
    }

    deleteInput() {
        if (this.inputText.innerText == "0") {
            return;
        }
        if (this.inputText.innerText.length == 1) {
            this.inputText.innerText = "0";
        } else {
            this.inputText.innerText = this.inputText.innerText.slice(0, this.inputText.innerText.length - 1);
        }
    }

    changeSign() {
        if (this.inputText.innerText == "0") {
            return;
        }
        if (Math.sign(Number(this.inputText.innerText))) {
            this.inputText.innerText = "-" + this.inputText.innerText;
        } else {
            this.inputText.innerText = this.inputText.innerText.slice(1);
        }
    }

    equalHandler() {
        if (this.currentOperation) {
            this.inputText.innerText = this.compute(this.currentOperation, this.previousOperand, this.inputText.innerText);
            this.previousOperand = null;
            this.currentOperand = null;
            this.currentOperation = null;
            this.IsOperatorClicked = null;
            this.IsEqualClicked = true;
        }
    }

    appendNumbers(event) {
        // If Equals Button Clicked
        if (this.IsEqualClicked) {
            this.inputText.innerText = "0";
            this.IsEqualClicked = false;
        }
        // If Operator Button Clicked
        if (this.IsOperatorClicked) {
            this.inputText.innerText = "0";
            this.IsOperatorClicked = false;
        }
        // Adding Inputs
        if (this.inputText.innerText == "0") {
            if (event.target.innerText == ".") {
                this.inputText.innerText += event.target.innerText;
            } else {
                this.inputText.innerText = event.target.innerText;
            }
            return;
        }
        if (this.inputText.innerText.length < 10) {
            if (event.target.innerText == "." && this.inputText.innerText.includes(".")) {
                return;
            }
            this.inputText.innerText += event.target.innerText;
        }
    }

    operatorHandler(event) {
        if (this.inputText.innerText != "0") {
            if (this.currentOperation) {
                this.currentOperand = this.inputText.innerText;
                this.inputText.innerText = this.compute(this.currentOperation, this.previousOperand, this.currentOperand);
                this.currentOperation = event.target.innerText;
                this.previousOperand = this.inputText.innerText;
                this.IsOperatorClicked = true;
                return;
            }
            this.previousOperand = this.inputText.innerText;
            this.currentOperation = event.target.innerText;
            this.IsOperatorClicked = true;
        }
    }
}

const cal = new Calculator;

// Event Listeners
cal.resetBtn.addEventListener('click', () => cal.reset());
cal.delBtn.addEventListener('click', () => cal.deleteInput());
cal.signBtn.addEventListener('click', () => cal.changeSign());
cal.equalBtn.addEventListener('click', () => cal.equalHandler());

cal.numBtn.forEach((num) => {
    num.addEventListener('click', (event) => {
        cal.appendNumbers(event)
    });
});

cal.operatorBtn.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        cal.operatorHandler(event);
    });
});
