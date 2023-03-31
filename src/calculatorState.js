import { Button } from "./button";
import { Decimal } from "decimal.js";
import { assign, createMachine } from "xstate";

function calculate(firstOperand, secondOperand, operator) {
  let result;
  switch (operator) {
    case Button.DIVIDE:
      // Return an error when dividing by zero
      if (secondOperand == 0) return undefined;
      result = firstOperand.dividedBy(secondOperand);
      break;
    case Button.MULTIPLY:
      result = firstOperand.times(secondOperand);
      break;
    case Button.SUBTRACT:
      result = firstOperand.minus(secondOperand);
      break;
    case Button.ADD:
      result = firstOperand.plus(secondOperand);
      break;
    default:
      return undefined;
  }
  let resultAsString = result.toSignificantDigits(15).toString();
  // Return an error when the result is too large or small,
  // or contains too many decimals
  if (resultAsString.indexOf("e") >= 0) {
    result = undefined;
  }
  return result;
}

const noError = (context) => context.display.indexOf("ERROR") < 0;
const canAppendMinus = (context, event) =>
  event.value == Button.SUBTRACT && context.display === "0";

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
      result: undefined,
      memory: undefined,
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
          SIGN: {
            actions: ["negateDisplay"],
          },
          OPERATOR: [
            {
              cond: "canAppendMinus",
              actions: "appendMinus",
            },
            {
              target: "editOperator",
              actions: ["saveFirstOperand", "saveOperator"],
            },
          ],
          DELETE: {
            actions: ["removeFromDisplay"],
          },
          CLEAR: {
            actions: ["resetAll"],
          },
          MEMORY_CLEAR: {
            actions: ["resetMemory"],
          },
          MEMORY_RECALL: {
            actions: ["setDisplayToMemory"],
          },
          MEMORY_PLUS: {
            actions: ["addToMemory"],
          },
          MEMORY_MINUS: {
            actions: ["subtractDisplayFromMemory"],
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
            actions: ["saveSecondOperand", "execute", "appendResultToDisplay"],
          },
          CLEAR: {
            target: "editFirstOperand",
            actions: ["resetAll"],
          },
          MEMORY_CLEAR: {
            actions: ["resetMemory"],
          },
          MEMORY_RECALL: {
            actions: ["setDisplayToMemory"],
          },
          MEMORY_PLUS: {
            actions: ["addToMemory"],
          },
          MEMORY_MINUS: {
            actions: ["subtractDisplayFromMemory"],
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
          SIGN: {
            actions: ["negateDisplay"],
          },
          OPERATOR: {
            target: "editOperator",
            actions: [
              "saveSecondOperand",
              "execute",
              "appendResultToDisplay",
              "saveResultAsFirstOperand",
              "saveOperator",
              "resetSecondOperand",
            ],
          },
          DELETE: {
            actions: ["removeFromDisplay"],
          },
          EQUALS: {
            target: "showResults",
            actions: ["saveSecondOperand", "execute", "appendResultToDisplay"],
          },
          CLEAR: {
            target: "editFirstOperand",
            actions: ["resetAll"],
          },
          MEMORY_CLEAR: {
            actions: ["resetMemory"],
          },
          MEMORY_RECALL: {
            actions: ["setDisplayToMemory"],
          },
          MEMORY_PLUS: {
            actions: ["addToMemory"],
          },
          MEMORY_MINUS: {
            actions: ["subtractDisplayFromMemory"],
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
            actions: [
              "resetSecondOperand",
              "saveResultAsFirstOperand",
              "saveOperator",
            ],
          },
          EQUALS: {
            cond: "noError",
            target: "showResults",
            actions: [
              "saveResultAsFirstOperand",
              "execute",
              "appendResultToDisplay",
            ],
          },
          CLEAR: {
            target: "editFirstOperand",
            actions: ["resetAll"],
          },
          MEMORY_CLEAR: {
            actions: ["resetMemory"],
          },
          MEMORY_RECALL: {
            actions: ["setDisplayToMemory"],
          },
          MEMORY_PLUS: {
            cond: "noError",
            actions: ["addToMemory"],
          },
          MEMORY_MINUS: {
            cond: "noError",
            actions: ["subtractDisplayFromMemory"],
          },
        },
      },
    },
  },
  {
    guards: { noError, canAppendMinus },
    actions: {
      // Display actions ///////////////////////////////////////////////////////

      appendToDisplay: assign({
        display: (context, event) => {
          let display = context.display;
          if (display === "0") {
            return event.value;
          }
          if (display === "-0") {
            return "-" + event.value;
          }
          // Digit limit is 15, but does not include "-"
          if (display.length == 15 && display.indexOf("-") < 0) {
            return display;
          }
          if (display.length >= 16) {
            return display;
          }
          return display + event.value;
        },
      }),
      removeFromDisplay: assign({
        display: (context) => {
          let display = context.display;
          // Check for negative number with single digit
          if (display.length == 2 && display.indexOf("-") >= 0) {
            return "0";
          }
          return display.length <= 1 ? "0" : display.slice(0, -1);
        },
      }),
      appendDecimalPoint: assign({
        display: (context) =>
          context.display.indexOf(".") < 0
            ? context.display + "."
            : context.display,
      }),
      appendMinus: assign({
        display: (context) =>
          context.display === "0" ? "-0" : context.display,
      }),
      appendResultToDisplay: assign({
        display: (context) =>
          context.result
            ? context.result.toSignificantDigits(15).toString()
            : "ERROR",
      }),
      negateDisplay: assign({
        display: (context) =>
          context.display.indexOf("-") < 0
            ? "-" + context.display
            : context.display.slice(1),
      }),
      setDisplayToMemory: assign({
        display: (context) =>
          context.memory
            ? context.memory.toSignificantDigits(15).toString()
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
      saveResultAsFirstOperand: assign({
        firstOperand: (context) => context.result,
        result: () => undefined,
      }),
      addToMemory: assign({
        memory: (context) => {
          let memoryValue = context.memory ? context.memory : new Decimal(0);
          let addValue = context.result
            ? context.result
            : new Decimal(context.display);
          return calculate(memoryValue, addValue, Button.ADD);
        },
      }),
      subtractDisplayFromMemory: assign({
        memory: (context) => {
          let memoryValue = context.memory ? context.memory : new Decimal(0);
          let subtractValue = context.result
            ? context.result
            : new Decimal(context.display);
          return calculate(memoryValue, subtractValue, Button.SUBTRACT);
        },
      }),

      // Reset actions /////////////////////////////////////////////////////////

      resetAll: assign({
        firstOperand: () => undefined,
        secondOperand: () => undefined,
        result: () => undefined,
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
      resetMemory: assign({
        memory: () => undefined,
      }),

      // Execute actions ///////////////////////////////////////////////////////

      execute: assign({
        result: (context) => {
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
