const calculatorState = {
  firstOperand: null,
  secondOperand: null,
  currentOperator: null,
};

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      if (b === 0) return "Error: Can't divide by zero";
      return divide(a, b);
    default:
      return null;
  }
}
