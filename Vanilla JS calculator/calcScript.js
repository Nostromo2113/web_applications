//Global variables

let inputNumber = ''; // The number pushed onto the stack
let operator = ''; // Mathematical operation sign
let canChangeSign = true; // Variable to change sign to a negative/positive number
let resultGlobal = ''; //Variable with the result to be written to the stack

// Arrays for an event handler
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];  //^^
const action = ['-', '+', 'X', '/', '%']; //^^
const changeSign = ['+/-'] //^^

//display variables
const display = document.querySelector('.result'); //  Display on the display of numbers, operators, and the result
const displayHistory = document.querySelector('.history'); //Display Operation chain
display.textContent = 0; // Default display


let stack = ''; //Stack as a string for writing numbers and operators



//Event handler. Currently valid for all characters
document.querySelector('.buttons').onclick = (event) => {
    // No button pressed
    if(!event.target.classList.contains('btn')) 
        return;
    
    // Pressing the ac button. Cleaning up the calculator
    if(event.target.classList.contains('ac')) {
      resultGlobal = '';  
      stack = '';
      inputNumber = ''; 
      operator = ''; 
      canChangeSign = true;
      display.textContent = 0;
      displayHistory.textContent = '';
      return;
    };


    const key = event.target.textContent; // Write click value
    
    // Changing the sign change variable
    if (changeSign.includes(key)) {
      if(operator === ''){
          if (canChangeSign === true){
            display.textContent = (inputNumber) * -1;
            canChangeSign = false;
          } else {
            canChangeSign = true;
            display.textContent = inputNumber;
    }}
}


    //  From this point, until the end of the event handler, the logic for writing values ​​to the stack is written.
      //  Each section writes a variable when pressed. Writing to the stack occurs when you move to the next action.
        //  For example, inputNumber is pushed onto the stack when the sign of a mathematical operation is pressed.
    
    
    //A block of logic that is executed when a number is pressed. We write the numbers into a variable. 
      //We write the sign of the mathematical operation to the stack, if it was previously written to a variable.

    if (digit.includes(key)) {
        resultGlobal = '';
        inputNumber += key;
            
            if(operator !== ''){
              stack += operator + ',';
              displayHistory.textContent += operator + ' ';
            }
        display.textContent = inputNumber;
        console.log('inputNumber. Read stack: ', stack);
        operator = '';
    };

// Logic blog responsible for pressing the sign of a mathematical operation.
if (action.includes(key)) {
  if(resultGlobal !== ''){
    operator = key;
    display.textContent = operator;
    console.log('if resultGlobal !== ""')

        } else if(inputNumber !== ''){
              operator = key; 
              display.textContent = operator;
                if (canChangeSign){
                    stack += inputNumber + ',';
                    displayHistory.textContent += inputNumber + ' ';
                } else {
                    stack += ((inputNumber) * -1) + ',';
                    displayHistory.textContent += ((inputNumber) * -1) + ' ';
                }
                        inputNumber = '';
                        canChangeSign = true;
                        console.log('input operator. Read stack:', stack);
                        
        } else if (operator != ''){
              operator = key;
                  if (canChangeSign){
                    stack += inputNumber + ',';
                    displayHistory.textContent += inputNumber + ' ';
                  } else {
                    stack += ((inputNumber) * -1) + ',';
                    displayHistory.textContent += ((inputNumber) * -1) + ' ';
                  }
                      canChangeSign = true;
                      display.textContent = operator; 
                      inputNumber = '';
        }
};

// Operator logic block =. 
// Here, variables are also written to the stack, as well as cleared for further calculations.
if(key === '='){ 
    if (canChangeSign){
        stack += inputNumber + ',';
        displayHistory.textContent = '';
    } else {
        stack += (inputNumber) * -1 + ',';
        displayHistory.textContent = '';
    }
  canChangeSign = true;
  calculate(stack)
  console.log('Check stack in "=": ',stack);

    if(resultGlobal !== ''){
    stack = resultGlobal + ',';
    displayHistory.textContent += resultGlobal + ' ';
    }
  inputNumber = '';
  operator = '';
}};

    

// Calculation function.

function calculate(stack) {
  const operatorsTokens = [];
  const digitTokens = [];
  const tokensArray = stack.split(',');
  let result = tokensArray[0];    // 
  console.log("tokensArray:", tokensArray);
  
  // Helper function. Priority to Operators
  const getPriority = (operator) => {
    if (operator === '+' || operator === '-') {
      return 1;
    } else if (operator === 'X' || operator === '/') {
      return 2;
    } else if (operator === '%') {
      return 3;
    }
    return 0;
  };

  // Parse the stack into tokens. Digits and operators into separate arrays
  for (let token of tokensArray) {
    if (!isNaN(token) && token !== '') {
      digitTokens.push(parseFloat(token));   // Number to array
      console.log(digitTokens);
    } else {
      while (operatorsTokens.length > 0 && getPriority(operatorsTokens[operatorsTokens.length - 1]) >= getPriority(token)) {
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // When we encounter an operator, we check its priority with the getPriority(operator) function. 
        // We then compare it to the last operator on the operatorsTokensArray stack. 
        // If the priority of the current operator is greater than or equal to the priority of the last operator on the stack, 
        // we perform the appropriate operation and push the result back onto the digitArray stack. 
        // If the current operator's priority is lower, we push it onto the operatorsTokensArray stack so that it can be processed later when lower priority operators arrive.
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        
        const a = digitTokens.pop(); console.log('a:', a)
        const b = digitTokens.pop(); console.log('b:', b)
        const operatorToken = operatorsTokens.pop();
    
        switch (operatorToken) {
          case '+':
            result = b + a;
            break;
          case '-':
            result = b - a;
            break;
          case 'X':
            result = b * a;
            break;
          case '%':
            result = (b * a) / 100;
            break;
          case '/':
            if (a === 0) {
              console.log('Error: "/0"');
              display.textContent = 'Error!';
              return;
            } else {
              result = b / a;
              break;
            }
          default: result = a;
        }

        digitTokens.push(result);
        console.log('RESULT:', result); 
      }
      operatorsTokens.push(token); console.log('read operatorsTokens in while:', operatorsTokens);
    }
  }
    
  if (result) {
  result = parseFloat(result).toFixed(2); // The result is returned as a string. To reduce the fraction, they converted it into a number.
}

  console.log('Finish Result:', result);

display.textContent = result;    
resultGlobal = result;
stack = '';
return;
};



















// 
  // while (operatorsTokensArray.length > 0) {
  //   console.log('Запуск второго цикла. Чек массивов', digitArray, operatorsTokensArray)
  //   const a = digitArray.pop();
  //   const b = digitArray.pop();
  //   const operatorToken = operatorsTokensArray.pop(); 
    
  //   switch (operatorToken) {
  //     case '+':
  //       result = b + a; 
  //       break;
  //     case '-':
  //       result = b - a;
  //       break;
  //     case 'X':
  //       result = b * a;
  //       break;
  //     case '%':
  //       result = (b * a) / 100;
  //       break;
  //     case '/':
  //       if (a === 0) {
  //         console.log('Ошибка: деление на ноль');
  //         return;
  //       } else {
  //         result = b / a;
  //         break;
  //       }
  //   }
  // }  