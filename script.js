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
let decimal = document.querySelector("#decimal");

//Calculator Control Functions
function setCalcDisplay(e){
if(display.textContent == "0"){
  display.textContent = e.target.textContent;
  resetDisplay = false
}else if(resetDisplay){
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
    //checkOverflow();
    operandOne = display.textContent;
    operator = e.target.textContent;
  }
  resetDisplay = true;
}

function checkOverflow(){
  let number = +display.textContent;
  if(display.textContent.length >= 10){
    if(display.textContent.indexOf(".") != -1 && !(display.textContent.indexOf(".") > 10)){
      let lengthBeforeDecimal = display.textContent.indexOf(".");
      let moves = (10 - lengthBeforeDecimal);
      number = multiply(number,10**moves);
      number = Math.round(number);
      if(toString(number).length > 10){
        number = divide(number,10**moves);
      }
    }else{
      let moves = display.textContent.length.toString().length;
      // number = divide(number,10**moves);
      // number = Math.round(number);
      number = number.toExponential(7 - moves);
      
    }

    display.textContent = number;
  }
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
    //checkOverflow();
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

decimal.addEventListener("click",()=>{
  if((display.textContent).indexOf(".") == -1){
    display.textContent += ".";
    resetDisplay = false;
  }
})