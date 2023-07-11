let display = document.querySelector('.display');
let output = document.querySelector('.output');
const nums = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const dangerBtns = document.querySelectorAll('.danger');
const equalBtn = document.querySelector('.btn-equals');

let operatorKey = "";
let firstNumber = "";
let secondNumber = "";
let operatorUsed = false;
let result = 0;
let dotUsed = false;

window.addEventListener('keydown', (e) => {
    if(e.code === "Backspace") deleteLast();

    if(e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" ||
    e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8" ||
    e.key === "9" || e.key === "0" || e.key === "."){
        if(e.key === "." && !dotUsed) dotUsed = true;
        else if(e.key === "." && dotUsed) return;
        display.value += e.key;
    }

    if(e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*" || e.key === "%"){
        e.preventDefault();
        getNumInput(e.key);
    }
    
    if(e.key === "Enter"){
        getOutput();
    }
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
        getNumInput(e.target.dataset.value);
    })
})

equalBtn.addEventListener('click', () => {
    getOutput();
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

function getOutput(){
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
}

function getNumInput(e){
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
            operatorKey = e; //
        }
    }

    if(!operatorUsed){
        dotUsed = false;
        firstNumber = display.value;
        if(firstNumber === "") return;
        display.value = "";
        operatorUsed = true;
        operatorKey = e; //
    }
}