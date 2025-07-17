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
let resultJustEvaluated = false;


function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
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
  document.querySelector('.js-display').textContent = displayValue || '0';
}


const digitButtons = document.querySelectorAll('.dark-grey');
digitButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const digit = e.target.textContent;

    if (displayValue === '0' || resultJustEvaluated) {
      displayValue = digit;
      resultJustEvaluated = false;
    } else if (displayValue.includes('.') && digit === '.') {
      return;
    }else {
      displayValue += digit;
    }

    updateDisplay();
  });
});


const operatorButtons = document.querySelectorAll('[data-display]');
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const operatorSymbol = button.dataset.display;
    const lastChar = displayValue.slice(-1);

    if (['+', '-', '×', '÷'].includes(lastChar)) {
      
      displayValue = displayValue.slice(0, -1) + operatorSymbol;
    } else {
      displayValue += operatorSymbol;
    }

    resultJustEvaluated = false;
    updateDisplay();
  });
});


const resultButton = document.querySelector('.equals-button');
resultButton.addEventListener('click', () => {
  const operators = ['+', '-', '×', '÷'];
  let operatorFound;

  for (let op of operators) {
    if (displayValue.includes(op)) {
      operatorFound = op;
      break;
    }
  }

  if (!operatorFound) return;

  const [firstOperand, secondOperand] = displayValue.split(operatorFound);
  const a = parseFloat(firstOperand);
  const b = parseFloat(secondOperand);

  if (isNaN(a) || isNaN(b)) return;

  const jsOperator = operatorFound === '×' ? '*' : operatorFound === '÷' ? '/' : operatorFound;
  const result = operate(jsOperator, a, b);

  displayValue = result.toString();
  updateDisplay();
  resultJustEvaluated = true;
});


const clearButton = document.querySelector('.js-clear');
clearButton.addEventListener('click', () => {
  displayValue = '';
  resultJustEvaluated = false;
  updateDisplay();
});
