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
  DECIMAL: "decimal",
  SIGN: "sign",
  MEMORY_CLEAR: "memory-clear",
  MEMORY_RECALL: "memory-recall",
  MEMORY_PLUS: "memory-plus",
  MEMORY_MINUS: "memory-minus",

  isOperator(value) {
    return [this.ADD, this.SUBTRACT, this.MULTIPLY, this.DIVIDE].includes(
      value
    );
  },

  isNumber(value) {
    return value.length == 1 && !isNaN(parseInt(value));
  },

  isInput(value) {
    return (
      [this.BACKSPACE, this.DECIMAL].includes(value) || this.isNumber(value)
    );
  },

  toString(value) {
    switch (value) {
      case Button.ADD:
        return "+";
      case Button.SUBTRACT:
        return "-";
      case Button.MULTIPLY:
        return "×";
      case Button.DIVIDE:
        return "÷";
      default:
        console.error("Unkown operator error");
    }
  },
});
