//Global Variable
let operandOne;
let operandTwo;
let operator;

//Basic Operation Functions
let add = (a,b) => a+b;
let subtract = (a,b) => a-b;
let multiply = (a,b) => a*b;
let divide = (a,b) => a/b;

function operate(a,b,op){
  switch(op){
    case '+': return add(a,b);
    case '-': return subtract(a,b);
    case '*': return multiply(a,b);
    case '/': return divide(a,b);
  }
}