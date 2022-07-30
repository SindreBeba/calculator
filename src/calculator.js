import { Button } from "./button";
import { Decimal } from "decimal.js";

// Variables used to store calculator state

let selectedOperator;
let runningTotal = new Decimal(0);
let currentOperand = new Decimal(0);
let lastAction = Button.EQUALS;

let operationOutputValue = "";
let outputValue = "0";

// HTML element constants

const operationOutput = document.querySelector(".operation");
const output = document.querySelector(".result");

// IO functions

function writeOutput() {
  if (outputValue.length > 13) {
    if (Button.isInput(lastAction)) {
      outputValue = outputValue.substr(0, 13);
    } else if (outputValue.indexOf(".") < 0 || outputValue.indexOf(".") >= 12) {
      clear();
      outputValue = "ERROR";
    } else {
      outputValue = outputValue.substr(0, 13);
    }
  }

  output.innerText = outputValue;
  operationOutput.innerText = operationOutputValue;
  operationOutputValue = "";
}

// Calculator functions

function handleNumber(inputValue) {
  if (Button.isInput(lastAction)) {
    if (outputValue === "0") {
      outputValue = inputValue;
    } else {
      outputValue += inputValue;
    }
  } else if (Button.isOperator(lastAction)) {
    outputValue = inputValue;
  } else {
    clear();
    outputValue = inputValue;
  }
}

function handleOperator(inputValue) {
  if (Button.isInput(lastAction)) {
    runningTotal = currentOperand;
    currentOperand = new Decimal(outputValue);
    execute();
  }
  selectedOperator = inputValue;
}

function clear() {
  selectedOperator = undefined;
  runningTotal = new Decimal(0);
  currentOperand = new Decimal(0);
  outputValue = "0";
  operationOutputValue = "";
}

function backspace() {
  if (lastAction == Button.EQUALS) {
    clear();
  } else if (!Button.isInput(lastAction) || outputValue.length <= 1) {
    outputValue = "0";
  } else {
    outputValue = outputValue.slice(0, -1);
  }
}

function decimal() {
  if (outputValue.indexOf(".") < 0) {
    outputValue += ".";
  }
}

function equals() {
  if (Button.isOperator(lastAction)) {
    return;
  }
  if (Button.isInput(lastAction)) {
    currentOperand = new Decimal(outputValue);
  }
  execute();
}

function execute() {
  if (selectedOperator) {
    operationOutputValue = `${runningTotal
      .toString()
      .substr(0, 13)} ${Button.toString(selectedOperator)} ${currentOperand} =`;
  }

  switch (selectedOperator) {
    case Button.DIVIDE:
      runningTotal = runningTotal.dividedBy(currentOperand);
      break;
    case Button.MULTIPLY:
      runningTotal = runningTotal.times(currentOperand);
      break;
    case Button.SUBTRACT:
      runningTotal = runningTotal.minus(currentOperand);
      break;
    case Button.ADD:
      runningTotal = runningTotal.plus(currentOperand);
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
    `State after "${buttonValue}": operator: ${selectedOperator}, total: ${runningTotal.toString()}, operand: ${currentOperand.toString()}, last action: ${lastAction}`
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
  } else if (buttonValue == Button.DECIMAL) {
    decimal();
  } else if (buttonValue == Button.EQUALS) {
    equals();
  } else {
    alert(`Error: operator "${buttonValue}" is not valid.`);
    return;
  }
  lastAction = buttonValue;
}
