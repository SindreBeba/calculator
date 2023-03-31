import { CalculatorMachine } from "./calculatorState";
import { Button } from "./button";
import { Decimal } from "decimal.js";
import { interpret } from "xstate";

// HTML element constants

const operationOutput = document.querySelector(".operation");
const output = document.querySelector(".result");

// The calculator state machine

const calculatorService = interpret(CalculatorMachine).onTransition((state) => {
  let context = state.context;

  console.log(
    `State:       ${state.value} \n` +
      `1st Operand: ${context.firstOperand} \n` +
      `2nd Operand: ${context.secondOperand} \n` +
      `Result:      ${context.result} \n` +
      `Memory:      ${context.memory} \n` +
      `Operator:    ${context.selectedOperator} \n` +
      `Display:     ${context.display}`
  );

  var operationOutputText = "";
  if (context.firstOperand !== undefined) {
    operationOutputText += context.firstOperand
      .toSignificantDigits(15)
      .toString();
  }
  if (context.selectedOperator !== undefined) {
    operationOutputText += ` ${Button.toString(context.selectedOperator)}`;
  }
  if (context.secondOperand !== undefined) {
    operationOutputText += ` ${context.secondOperand
      .toSignificantDigits(15)
      .toString()}`;
  }

  operationOutput.innerText = operationOutputText;
  output.innerText = context.display;
});

// Input handler

function handleButtonInput(buttonValue) {
  let eventName = convertButtonValueToEventName(buttonValue);

  if (eventName) {
    calculatorService.send({ type: eventName, value: buttonValue });
  } else {
    alert(`Error: button value "${buttonValue}" is not valid.`);
  }
}

function convertButtonValueToEventName(buttonValue) {
  switch (true) {
    case Button.isNumber(buttonValue):
      return "NUMBER";
    case Button.isOperator(buttonValue):
      return "OPERATOR";
    case Button.EQUALS == buttonValue:
      return "EQUALS";
    case Button.BACKSPACE == buttonValue:
      return "DELETE";
    case Button.DECIMAL == buttonValue:
      return "DECIMAL";
    case Button.SIGN == buttonValue:
      return "SIGN";
    case Button.CLEAR == buttonValue:
      return "CLEAR";
    case Button.MEMORY_CLEAR == buttonValue:
      return "MEMORY_CLEAR";
    case Button.MEMORY_RECALL == buttonValue:
      return "MEMORY_RECALL";
    case Button.MEMORY_PLUS == buttonValue:
      return "MEMORY_PLUS";
    case Button.MEMORY_MINUS == buttonValue:
      return "MEMORY_MINUS";
    default:
      return undefined;
  }
}

// Init

function init() {
  document.querySelector(".calc").addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      handleButtonInput(event.target.value);
    }
  });
  document
    .querySelector("#dark-mode-toggle")
    .addEventListener("click", function () {
      document.querySelector("#container").classList.toggle("dark-mode");
    });
  // Set options for Decimal.js
  Decimal.set({ toExpPos: 15, toExpNeg: -14, precision: 20 });
  calculatorService.start();
}

init();
