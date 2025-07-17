function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;
  document.querySelector('.js-time').textContent = currentTime;
}
updateTime();
setInterval(updateTime, 60000);

let displayValue = '';
let firstOperand = null;
let currentOperator = null;
let resultJustEvaluated = false;
let waitingForSecondOperand = false;
let showOperatorOnly = false;

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function divide(a, b) {
  return b === 0 ? 'Error' : a / b;
}
function multiply(a, b) {
  return a * b;
}
function operate(operator, a, b) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}

function updateDisplay() {
  const display = document.querySelector('.js-display');
  if (showOperatorOnly) {
    display.textContent = currentOperator === '*' ? '×' :
                          currentOperator === '/' ? '÷' :
                          currentOperator;
  } else {
    display.textContent = displayValue || '';
  }
  const length = display.textContent.length;
  if (length >= 10) {
    display.style.fontSize = '2rem';
  } else if (length >= 7) {
    display.style.fontSize = '2.5rem';
  } else {
    display.style.fontSize = '3.5rem';
  }
}

function resetCalculator() {
  displayValue = '';
  firstOperand = null;
  currentOperator = null;
  resultJustEvaluated = false;
  waitingForSecondOperand = false;
  showOperatorOnly = false;
  updateDisplay();
}

const digitButtons = document.querySelectorAll('.dark-grey');
digitButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const digit = e.target.textContent;
    if (resultJustEvaluated || waitingForSecondOperand || showOperatorOnly) {
      displayValue = '';
      resultJustEvaluated = false;
      waitingForSecondOperand = false;
      showOperatorOnly = false;
    }
    if (displayValue.length >= 5) return;
    if (digit === '.' && displayValue.includes('.')) return;
    displayValue += digit;
    updateDisplay();
  });
});

const operatorButtons = document.querySelectorAll('[data-display]');
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const operatorSymbol = button.dataset.display;
    const jsOperator = operatorSymbol === '×' ? '*' : operatorSymbol === '÷' ? '/' : operatorSymbol;
    if (displayValue === '' && firstOperand === null) return;
    if (firstOperand !== null && currentOperator && !waitingForSecondOperand) {
      const secondOperand = parseFloat(displayValue);
      if (!isNaN(secondOperand)) {
        const result = operate(currentOperator, firstOperand, secondOperand);
        displayValue = result.toString();
        updateDisplay();
        firstOperand = result;
      }
    } else if (displayValue !== '') {
      firstOperand = parseFloat(displayValue);
    }
    currentOperator = jsOperator;
    waitingForSecondOperand = true;
    resultJustEvaluated = false;
    showOperatorOnly = true;
    updateDisplay();
  });
});

const resultButton = document.querySelector('.equals-button');
resultButton.addEventListener('click', () => {
  if (firstOperand === null || currentOperator === null || displayValue === '') return;
  const secondOperand = parseFloat(displayValue);
  if (isNaN(secondOperand)) return;
  const result = operate(currentOperator, firstOperand, secondOperand);
  displayValue = result.toString();
  updateDisplay();
  firstOperand = result;
  currentOperator = null;
  resultJustEvaluated = true;
  waitingForSecondOperand = false;
  showOperatorOnly = false;
});

const clearButton = document.querySelector('.js-clear');
clearButton.addEventListener('click', resetCalculator);
