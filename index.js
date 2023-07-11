let display = document.querySelector('.display');
let output = document.querySelector('.output');
const nums = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.btn-equals');

const operatorsList = ["+", "-", "*", "/", "%"];

let operatorKey = "";
let firstNumber = "";
let secondNumber = "";
let isOperatorUsed = false;
let result = 0;

nums.forEach(num => {
    num.addEventListener('click', (e) => {
        display.value += e.target.dataset.value;
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if(isOperatorUsed){
            secondNumber = display.value;
            if(secondNumber === "") return;
            else {
                result = calculate(Number(firstNumber), Number(secondNumber), operatorKey);
                display.value = "";
                output.value = result;
                firstNumber = result;
                operatorKey = e.target.dataset.value;
            }
        }

        if(!isOperatorUsed){
            firstNumber = display.value;
            if(firstNumber === "") return;
            operatorKey = e.target.dataset.value;
            display.value = "";
            isOperatorUsed = true;
        }
    })
})

equalBtn.addEventListener('click', (e) => {
    if(isOperatorUsed){
        secondNumber = display.value;
        if(secondNumber === "") return;
        
        displayResult();
    }
})

function displayResult(){
    result = calculate(Number(firstNumber), Number(secondNumber), operatorKey);
    output.value = result;
    isOperatorUsed = false;
}

function calculate(firstNumber, secondNumber, operator){
    if(operator === "+") return (firstNumber + secondNumber);
    else if(operator === "-") return (firstNumber - secondNumber);
    else if(operator === "*") return (firstNumber * secondNumber);
    else if(operator === "/") return (firstNumber / secondNumber);
    else if(operator === "%") return (firstNumber % secondNumber);
}