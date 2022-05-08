// Enum object for button tag values
export const Button = Object.freeze({
  // Operators
  ADD: "add",
  SUBTRACT: "subtract",
  MULTIPLY: "multiply",
  DIVIDE: "divide",
  // Other buttons
  CLEAR: "clear",
  BACKSPACE: "back",
  EQUALS: "equals",

  isOperator(value) {
    return [this.ADD, this.SUBTRACT, this.MULTIPLY, this.DIVIDE].includes(
      value
    );
  },

  isNumber(value) {
    return value.length == 1 && !isNaN(parseInt(value));
  },
});
