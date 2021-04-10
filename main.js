const calculator = document.querySelector('.calculator');
const screen = document.querySelector('.cal-screen');
const buttons = document.querySelector('.cal-buttons');
let previousTypedButton = '';
let typedAfterOperator = false;

buttons.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const buttonContent = e.target.textContent;
        const numDisplayed = screen.textContent;
        const action = e.target.dataset.action;

        if (!action) {
            if (numDisplayed === '0' || previousTypedButton === 'operator') {
                if (numDisplayed !== '0' && typedAfterOperator) {
                    screen.textContent += buttonContent;
                } else {
                    if (previousTypedButton === 'operator')
                        typedAfterOperator = true;
                    screen.textContent = buttonContent;
                }
            } else {
                screen.textContent += buttonContent;
            }
        }

        if (action === 'decimal') {
            screen.textContent += '.';
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            previousTypedButton = 'operator';
            calculator.dataset.firstValue = numDisplayed;
            calculator.dataset.operator = action;
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = numDisplayed;

            screen.textContent = calculate(firstValue, operator, secondValue);
        }

        if (action === 'clear') {
            screen.textContent = '0';
            typedAfterOperator = false;
            previousTypedButton = "";
        }
    }
})

const calculate = (n1, operator, n2) => {
    if (operator === 'add') {
        return parseFloat(n1) + parseFloat(n2);
    }

    if (operator === 'subtract') {
        return parseFloat(n1) - parseFloat(n2);
    }

    if (operator === 'multiply') {
        return parseFloat(n1) * parseFloat(n2);
    }

    if (operator === 'divide') {
        return parseFloat(n1) / parseFloat(n2);
    }
}