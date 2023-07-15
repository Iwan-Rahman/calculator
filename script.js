//Global Variables
let operandOne = null;
let operandTwo = null;
let operator = null;
let resetDisplay = true;

//Basic Operation Functions
let add = (a,b) => a+b;
let subtract = (a,b) => a-b;
let multiply = (a,b) => a*b;
let divide = (a,b) => a/b;

//Operate Function
function operate(a,b,op){
  switch(op){
    case '+': return add(a,b);
    case '-': return subtract(a,b);
    case '×': return multiply(a,b);
    case '÷': return divide(a,b);
  }
}

//Calculator Nodes
let numbers = document.querySelectorAll(".digit");
let operations = document.querySelectorAll(".operation");
let display = document.querySelector(".calc-display");
let equal = document.querySelector("#equal");
let clear = document.querySelector("#ac");
let percent = document.querySelector("#percent");
let sign = document.querySelector("#sign");

//Calculator Control Functions
function setCalcDisplay(e){
if(resetDisplay){
    display.textContent = e.target.textContent;
    resetDisplay = false;
  }else if(display.textContent.length < 10){
    display.textContent += e.target.textContent;  
  }
}

function setOperation(e){
  if(operandOne == null){
    operandOne = display.textContent;
    operator = e.target.textContent;
  }else{
    operandTwo = display.textContent
    display.textContent = operate(+operandOne,+operandTwo,operator);
    operandOne = display.textContent;
    operator = e.target.textContent;
  }
  resetDisplay = true;
}

//Event Handlers
for(let number of numbers){
  number.addEventListener("click",setCalcDisplay);
}

for(let operator of operations){
  operator.addEventListener("click",setOperation);
}

equal.addEventListener("click",() => {
  if(operator != null){
    operandTwo = display.textContent;
    display.textContent = operate(+operandOne,+operandTwo,operator);
  }
  operandOne = null;
  operandTwo = null;
  operator = null;
  resetDisplay = true;
})

clear.addEventListener("click",() => {
  operandOne = null;
  operandTwo = null;
  operator = null;
  resetDisplay = true;
  display.textContent = "0";
})

percent.addEventListener("click", () => {
  display.textContent = divide(+display.textContent,100);
})

sign.addEventListener("click", () => {
  display.textContent = multiply(+display.textContent,-1);
})