// Variables used to store calculator state

let selectedOperator;
let runningTotal = 0;
let currentOperand = 0;
let lastAction = 'equals'; // number, operator, equals

let outputValue = '';

// HTML element constants

const output = document.querySelector('.output');

// IO functions

function buttonClicked(inputValue) {
    if (isNaN(parseInt(inputValue))) {
        handleOperator(inputValue);
    } else {
        handleNumber(inputValue);
    }
    
    writeOutput();
    console.log(`State after "${inputValue}": operator: ${selectedOperator}, total: ${runningTotal}, operand: ${currentOperand}, last action: ${lastAction}`);
}

function writeOutput() {
    if (outputValue.length > 13) {
        if (lastAction === 'number') {
            outputValue = outputValue.substr(0,13);
        } else {
            clear();
            outputValue = 'ERROR';
        }
    }
    
    output.innerText = outputValue;
}

// Calculator functions

function handleNumber(inputValue) {
    switch (lastAction) {
        case 'number':
            if (outputValue === '0') {
                outputValue = inputValue;
            } else {
                outputValue += inputValue;
            }
            break;
        case 'operator':
            outputValue = inputValue;
            break;
        case 'equals':
            clear();
            outputValue = inputValue;
            break;
    }

    lastAction = 'number';
}

function handleOperator(inputValue) {
    switch(inputValue) {
        case 'clear':
            clear();
            break;
        case 'back':
            if (lastAction === 'equals') {
                clear();
            } else {
                backspace();
            }
            break;
        case 'divide':
        case 'multiply':
        case 'subtract':
        case 'add':
            if (lastAction === 'number') {
                runningTotal = currentOperand;
                currentOperand = parseInt(outputValue);
                execute();
            }
            selectedOperator = inputValue;
            lastAction = 'operator';
            break;
        case 'equals':
            if (lastAction === 'operator') {
                return;
            }
            if (lastAction === 'number') {
                currentOperand = parseInt(outputValue);
            }
            execute();
            lastAction = 'equals';
            break;
        default:
            alert(`Error: operator "${inputValue}" is not valid.`);
    }
}

function clear() {
    selectedOperator = undefined;
    runningTotal = 0;
    currentOperand = 0;
    lastAction = 'equals';
    outputValue = '0';
}

function backspace() {
    if (lastAction !== 'number' || outputValue.length <= 1) {
        outputValue = '0';
    } else {
        outputValue = outputValue.slice(0, -1);
    }
}

function execute() {
    switch (selectedOperator) {
        case 'divide':
            runningTotal = Math.floor(runningTotal / currentOperand);
            break;
        case 'multiply':
            runningTotal = runningTotal * currentOperand;
            break;
        case 'subtract':
            runningTotal = runningTotal - currentOperand;
            break;
        case 'add':
            runningTotal = runningTotal + currentOperand;
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
    document.querySelector('.calc').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            buttonClicked(event.target.value);
        }
    });
};

init();