let display = document.querySelector('.display');
let output = document.querySelector('.output');
const nums = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const dangerBtns = document.querySelectorAll('.danger');
const equalBtn = document.querySelector('.btn-equals');

const operatorsList = ["+", "-", "*", "/", "%"];

let operatorKey = "";
let firstNumber = "";
let secondNumber = "";
let operatorUsed = false;
let result = 0;
let dotUsed = false;

window.addEventListener('keydown', (e) => {
    if(e.code === "Backspace") deleteLast();
})

dangerBtns.forEach(dangerBtn => {
    dangerBtn.addEventListener('click', (e) => {
    
        if(e.target.dataset.value === "AC"){
            //clear all
            clearAll();
        }
        else if(e.target.dataset.value === "DEL"){
            //delete one char
            deleteLast();
        }
    })
})

nums.forEach(num => {
    num.addEventListener('click', (e) => {
        if(e.target.dataset.value === "." && !dotUsed) dotUsed = true;
        else if(e.target.dataset.value === "." && dotUsed) return;
        display.value += e.target.dataset.value;
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if(operatorUsed){
            dotUsed = false;
            secondNumber = display.value;
            if(secondNumber === "") return;
            if(secondNumber === "0") {
                output.value = "Can't divide by zero";
                secondNumber="";
                return;
            }
            else { 
                result = +(Math.round(calculate(Number(firstNumber), Number(secondNumber), operatorKey) + "e+2")  + "e-2");
                display.value = "";
                output.value = result;
                firstNumber = result;
                operatorKey = e.target.dataset.value;
            }
        }

        if(!operatorUsed){
            dotUsed = false;
            firstNumber = display.value;
            if(firstNumber === "") return;
            operatorKey = e.target.dataset.value;
            display.value = "";
            operatorUsed = true;
        }
    })
})

equalBtn.addEventListener('click', (e) => {
    if(operatorUsed){
        secondNumber = display.value;
        if(secondNumber === "") return;
        if(secondNumber === "0"){
            output.value = "Can't divide by zero";
            secondNumber="";
            return;
        }
        
        displayResult();
    }
})

function displayResult(){
    result = +(Math.round(calculate(Number(firstNumber), Number(secondNumber), operatorKey) + "e+2")  + "e-2");
    output.value = result;
    operatorUsed = false;
    dotUsed = false;
}

function calculate(firstNumber, secondNumber, operator){
    if(operator === "+") return (firstNumber + secondNumber);
    else if(operator === "-") return (firstNumber - secondNumber);
    else if(operator === "*") return (firstNumber * secondNumber);
    else if(operator === "/") return (firstNumber / secondNumber);
    else if(operator === "%") return (firstNumber % secondNumber);
}

function deleteLast(){
    const txt = display.value;
    display.value = txt.slice(0, -1);
}

function clearAll(){
    display.value = "";
    output.value = "";
    operatorKey = "";
    operatorUsed = false;
    dotUsed = false;
    firstNumber = "";
    secondNumber = "";
    result = 0;
}