import { Button } from "./button";
import { Decimal } from "decimal.js";
import { assign, createMachine } from "xstate";

function calculate(firstOperand, secondOperand, operator) {
  let result;
  switch (operator) {
    case Button.DIVIDE:
      // Return an error when dividing by zero
      result =
        secondOperand == 0
          ? "DIV/0 ERROR"
          : firstOperand.dividedBy(secondOperand).toString();
      break;
    case Button.MULTIPLY:
      result = firstOperand.times(secondOperand).toString();
      break;
    case Button.SUBTRACT:
      result = firstOperand.minus(secondOperand).toString();
      break;
    case Button.ADD:
      result = firstOperand.plus(secondOperand).toString();
      break;
    default:
      result = "OPERATOR ERROR";
  }
  // Return an error when the result is too large or small
  if (result.indexOf("e+") >= 0) {
    result = result.charAt(0) == "-" ? "MIN ERROR" : "MAX ERROR";
  }
  // Return an error when the result contains too many decimals
  if (result.indexOf("e-") >= 0) {
    result = "DECIMAL ERROR";
  }
  return result;
}

const noError = (context) => context.display.indexOf("ERROR") < 0;

/*
 * A state machine representing the calculator.
 *
 * Available states:
 *  1. editFirstOperand
 *  2. editOperator
 *  3. editSecondOperand
 *  4. showResults
 *
 * Available events:
 *  - NUMBER
 *  - OPERATOR
 *  - CLEAR
 *  - DELETE
 *  - DECIMAL
 *  - EQUALS
 */
export const CalculatorMachine = createMachine(
  {
    predictableActionArguments: true,
    id: "calculatorMachine",
    initial: "editFirstOperand",
    context: {
      firstOperand: undefined,
      secondOperand: undefined,
      selectedOperator: undefined,
      display: "0",
    },
    states: {
      // State 1: Edit first operand ///////////////////////////////////////////

      editFirstOperand: {
        on: {
          NUMBER: {
            actions: ["appendToDisplay"],
          },
          DECIMAL: {
            actions: ["appendDecimalPoint"],
          },
          OPERATOR: {
            target: "editOperator",
            actions: ["saveFirstOperand", "saveOperator"],
          },
          DELETE: {
            actions: ["removeFromDisplay"],
          },
          CLEAR: {
            actions: ["resetAll"],
          },
        },
      },

      // State 2: Edit operator ////////////////////////////////////////////////

      editOperator: {
        on: {
          NUMBER: {
            target: "editSecondOperand",
            actions: ["resetDisplay", "appendToDisplay"],
          },
          OPERATOR: {
            actions: ["saveOperator"],
          },
          DELETE: {
            target: "editFirstOperand",
            actions: ["resetFirstOperand", "resetOperator"],
          },
          EQUALS: {
            target: "showResults",
            actions: ["saveSecondOperand", "execute"],
          },
          CLEAR: {
            target: "editFirstOperand",
            actions: ["resetAll"],
          },
        },
      },

      // State 3: Edit second operand //////////////////////////////////////////

      editSecondOperand: {
        on: {
          NUMBER: {
            actions: ["appendToDisplay"],
          },
          DECIMAL: {
            actions: ["appendDecimalPoint"],
          },
          OPERATOR: {
            target: "editOperator",
            actions: [
              "saveSecondOperand",
              "execute",
              "saveFirstOperand",
              "saveOperator",
              "resetSecondOperand",
            ],
          },
          DELETE: {
            actions: ["removeFromDisplay"],
          },
          EQUALS: {
            target: "showResults",
            actions: ["saveSecondOperand", "execute"],
          },
          CLEAR: {
            target: "editFirstOperand",
            actions: ["resetAll"],
          },
        },
      },

      // State 4: Show results /////////////////////////////////////////////////

      showResults: {
        entry: ["verifyResults"],
        on: {
          NUMBER: {
            target: "editFirstOperand",
            actions: ["resetAll", "appendToDisplay"],
          },
          OPERATOR: {
            cond: "noError",
            target: "editOperator",
            actions: ["resetSecondOperand", "saveFirstOperand", "saveOperator"],
          },
          EQUALS: {
            cond: "noError",
            target: "showResults",
            actions: ["saveFirstOperand", "execute"],
          },
          CLEAR: {
            target: "editFirstOperand",
            actions: ["resetAll"],
          },
        },
      },
    },
  },
  {
    guards: { noError },
    actions: {
      // Display actions ///////////////////////////////////////////////////////

      appendToDisplay: assign({
        display: (context, event) => {
          if (context.display === "0") {
            return event.value;
          }
          if (context.display.length >= 15) {
            return context.display;
          }
          return context.display + event.value;
        },
      }),
      removeFromDisplay: assign({
        display: (context) =>
          context.display.length <= 1 ? "0" : context.display.slice(0, -1),
      }),
      appendDecimalPoint: assign({
        display: (context) =>
          context.display.indexOf(".") < 0
            ? context.display + "."
            : context.display,
      }),

      // Save actions //////////////////////////////////////////////////////////

      saveFirstOperand: assign({
        firstOperand: (context) => new Decimal(context.display),
      }),
      saveSecondOperand: assign({
        secondOperand: (context) => new Decimal(context.display),
      }),
      saveOperator: assign({
        selectedOperator: (context, event) => event.value,
      }),

      // Reset actions /////////////////////////////////////////////////////////

      resetAll: assign({
        firstOperand: () => undefined,
        secondOperand: () => undefined,
        selectedOperator: () => undefined,
        display: () => "0",
      }),
      resetFirstOperand: assign({
        firstOperand: () => undefined,
      }),
      resetSecondOperand: assign({
        secondOperand: () => undefined,
      }),
      resetOperator: assign({
        selectedOperator: () => undefined,
      }),
      resetDisplay: assign({
        display: () => "0",
      }),

      // Execute actions ///////////////////////////////////////////////////////

      execute: assign({
        display: (context) => {
          return calculate(
            context.firstOperand,
            context.secondOperand,
            context.selectedOperator
          );
        },
      }),
      verifyResults: assign({
        firstOperand: (context) =>
          noError(context) ? context.firstOperand : undefined,
        secondOperand: (context) =>
          noError(context) ? context.secondOperand : undefined,
        selectedOperator: (context) =>
          noError(context) ? context.selectedOperator : undefined,
      }),
    },
  }
);
