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
let equal = document.querySelector(".calc-btn.equal");
let clear = document.querySelector(".calc-btn.ac");
let percent = document.querySelector(".calc-btn.percent");
let sign = document.querySelector(".calc-btn.sign");
let decimal = document.querySelector(".calc-btn.decimal");

//Calculator Control Functions
function setCalcDisplay(e){
if(display.textContent == "0" || resetDisplay){
  display.textContent = e.target.textContent;
  if(operandOne != null){
    clearAllOperationSelect();
  }
  resetDisplay = false
}else if(display.textContent.length < 10){
    display.textContent += e.target.textContent;  
  }
}

function setOperation(e){
  if(operandOne == null){
    operandOne = display.textContent;
    operator = e.target.textContent;
  }else if(resetDisplay == true){
    operator = e.target.textContent;
  }else {
    operandTwo = display.textContent;
    display.textContent = operate(+operandOne,+operandTwo,operator);
    checkOverflow();
    operandOne = display.textContent;
    operator = e.target.textContent;
  }
  resetDisplay = true;
}

function checkOverflow(){
  let number = +display.textContent;
  if(display.textContent.length >= 10){
    if(display.textContent.indexOf(".") != -1 && !(display.textContent.indexOf(".") > 10) && display.textContent.indexOf("e") == -1){
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
  number.addEventListener("click",(e) => {
    setCalcDisplay(e);
    e.target.setAttribute("id","select");
  });
}

for(let operator of operations){
  operator.addEventListener("click",(e) => {
    setOperation(e);
    clearAllOperationSelect();
    e.target.setAttribute("id","select");
  });
}

equal.addEventListener("click",() => {
  if(operator != null){
    operandTwo = display.textContent;
    display.textContent = operate(+operandOne,+operandTwo,operator);
    checkOverflow();
  }
  operandOne = null;
  operandTwo = null;
  operator = null;
  resetDisplay = true;

  clearAllOperationSelect();
  equal.setAttribute("id","select");
})

clear.addEventListener("click",() => {
  operandOne = null;
  operandTwo = null;
  operator = null;
  resetDisplay = true;
  display.textContent = "0";
  clearAllOperationSelect();
  clear.setAttribute("id","select");
})

percent.addEventListener("click", () => {
  display.textContent = divide(+display.textContent,100);
  checkOverflow();
  percent.setAttribute("id","select");;
})

sign.addEventListener("click", () => {
  display.textContent = multiply(+display.textContent,-1);
  sign.setAttribute("id","select");;
})

decimal.addEventListener("click",()=>{
  if((display.textContent).indexOf(".") == -1){
    display.textContent += ".";
    resetDisplay = false;
  }
  decimal.setAttribute("id","select");;
})

//Calculator Style Functions and Event Listeners
buttons = document.querySelectorAll(".calc-btn");

for(let i = 0; i < buttons.length; i++){
  if(!(buttons[i].classList.contains("operation"))){
    buttons[i].addEventListener("transitionend", () => {
      buttons[i].removeAttribute("id");
    })
  }
}

function clearAllOperationSelect(){
  for(op of operations) op.removeAttribute("id");
}