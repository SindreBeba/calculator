import { Button } from "./button";

// Variables used to store calculator state

let selectedOperator;
let runningTotal = 0;
let currentOperand = 0;
let lastAction = Button.EQUALS;

let outputValue = "0";

// HTML element constants

const output = document.querySelector(".output");

// IO functions

function writeOutput() {
  if (outputValue.length > 13) {
    if (Button.isNumber(lastAction)) {
      outputValue = outputValue.substr(0, 13);
    } else {
      clear();
      outputValue = "ERROR";
    }
  }

  output.innerText = outputValue;
}

// Calculator functions

function handleNumber(inputValue) {
  if (Button.isNumber(lastAction)) {
    if (outputValue === "0") {
      outputValue = inputValue;
    } else {
      outputValue += inputValue;
    }
  } else if (Button.isOperator(lastAction)) {
    outputValue = inputValue;
  } else if (lastAction == Button.EQUALS) {
    clear();
    outputValue = inputValue;
  }

  lastAction = inputValue;
}

function handleOperator(inputValue) {
  if (Button.isNumber(lastAction)) {
    runningTotal = currentOperand;
    currentOperand = parseInt(outputValue);
    execute();
  }
  selectedOperator = inputValue;
  lastAction = inputValue;
}

function clear() {
  selectedOperator = undefined;
  runningTotal = 0;
  currentOperand = 0;
  lastAction = Button.EQUALS;
  outputValue = "0";
}

function backspace() {
  if (lastAction == Button.EQUALS) {
    clear();
  } else if (!Button.isNumber(lastAction) || outputValue.length <= 1) {
    outputValue = "0";
  } else {
    outputValue = outputValue.slice(0, -1);
  }
}

function equals() {
  if (Button.isOperator(lastAction)) {
    return;
  }
  if (Button.isNumber(lastAction)) {
    currentOperand = parseInt(outputValue);
  }
  execute();
  lastAction = Button.EQUALS;
}

function execute() {
  switch (selectedOperator) {
    case Button.DIVIDE:
      runningTotal = Math.floor(runningTotal / currentOperand);
      break;
    case Button.MULTIPLY:
      runningTotal = runningTotal * currentOperand;
      break;
    case Button.SUBTRACT:
      runningTotal = runningTotal - currentOperand;
      break;
    case Button.ADD:
      runningTotal = runningTotal + currentOperand;
      break;
    case undefined:
      runningTotal = currentOperand;
      break;
    default:
      alert(`Error: operator "${selectedOperator}" is not valid.`);
      return;
  }

  outputValue = runningTotal.toString();
}

// Init

function init() {
  document.querySelector(".calc").addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      buttonClicked(event.target.value);
    }
  });
}

init();

function buttonClicked(buttonValue) {
  inputHandler(buttonValue);
  writeOutput();
  console.log(
    `State after "${buttonValue}": operator: ${selectedOperator}, total: ${runningTotal}, operand: ${currentOperand}, last action: ${lastAction}`
  );
}

function inputHandler(buttonValue) {
  if (Button.isNumber(buttonValue)) {
    handleNumber(buttonValue);
  } else if (Button.isOperator(buttonValue)) {
    handleOperator(buttonValue);
  } else if (buttonValue == Button.CLEAR) {
    clear();
  } else if (buttonValue == Button.BACKSPACE) {
    backspace();
  } else if (buttonValue == Button.EQUALS) {
    equals();
  } else {
    alert(`Error: operator "${buttonValue}" is not valid.`);
  }
}
