const input = document.getElementById('inputBox');
const buttons = document.querySelectorAll('button');

let string = "";
let calculationHistory = [];
let lastResult = null;
let isNewCalculation = true;

function appendToDisplay(value) {
    if (isNewCalculation && /[0-9]/.test(value)) {
        string = "";
        isNewCalculation = false;
    }
    
    if (value === '.' && string.includes('.')) return;
    if (['+', '-', '*', '/', '%'].includes(value) && 
        ['+', '-', '*', '/', '%'].includes(string.slice(-1))) {
        string = string.slice(0, -1);
    }
    string += value;
    input.value = string;
}

function calculate() {
    try {
        if (!string) return;
        const result = eval(string.replace(/×/g, '*'));
        input.value = result;
        string = result.toString();
        isNewCalculation = true;
    } catch {
        input.value = "Error";
        string = "";
        isNewCalculation = true;
        setTimeout(() => input.value = string, 1000);
    }
}

function clearAll() {
    string = "";
    input.value = string;
    isNewCalculation = true;
}

function deleteLastChar() {
    string = string.slice(0, -1);
    input.value = string;
}

function handleError(error) {
    input.value = "Error";
    string = "";
    setTimeout(() => {
        input.value = string;
    }, 1000);
}

// Button click handlers
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerHTML;
        if (value === '=') calculate();
        else if (value === 'AC') clearAll();
        else if (value === '<i class="fas fa-backspace"></i>') deleteLastChar();
        else if (value === '×') appendToDisplay('*');
        else appendToDisplay(value);
    });
});