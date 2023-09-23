
export const calcultate = (infix) => {
  const postfixExpression = postfix(infix);
  const stack = [];
  const variablePattern = /[a-zA-Z]+/g;
  //replace the variables with their value
  const replacedVariablesArray = postfixExpression.map((element) => {
    if (variablePattern.test(element)) {
     
      return infix[element] || element; 
    }
    return element; 
  });
 
  for (let element of replacedVariablesArray) {
   
    if(element === ' '){
      continue;
    }
    if (!isNaN(element)) {
      stack.push(parseFloat(element));
      console.log(stack)
    } else {
      const op2 = stack.pop();
      const op1 = stack.pop();

      switch (element) {
        case "+":
          stack.push(op1 + op2);
          break;
        case "-":
          stack.push(op1 - op2);
          break;
        case "*":
          stack.push(op1 * op2);
          break;
        case "/":
          stack.push(op1 / op2);
          break;
        case "^":
          stack.push(Math.pow(op1, op2));
          break;
        default:
          throw new Error(`Invalid operator: ${element}`);
      }
    }
  }
  if (stack.length === 1) {
   // console.log(stack[0])
    return stack[0];
  } else {
    throw new Error("Invalid postfix expression ");
  }
};


export const postfix = (infix) => {
  let stack = [];
  let output = [];

const filteredInfix=formatInfix(infix);
//regex to check of any alphanumeric and decimal expression
const regexVar = new RegExp("^([a-zA-Z0-9]+(\\.[0-9]+)?|[0-9]+(\\.[0-9]+)?)$", "i");
const regexOp = new RegExp("^[+\\-*/^]$");

  for (let i = 0; i < filteredInfix.length; i++) {
    if (regexVar.test(filteredInfix[i])) {
      output.push(filteredInfix[i]);
    } else if (regexOp.test(filteredInfix[i])) {
      while (
        stack.length > 0 &&
        isHigherPrecedence(filteredInfix[i], stack[stack.length-1]) &&
        stack[stack.length - 1] !== "(" 
      ) {
        output.push(stack.pop());
      }
     
      stack.push(filteredInfix[i]);
    } else if (filteredInfix[i] === "(") {
      stack.push(filteredInfix[i]);
    } else if (filteredInfix[i] === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop();
    }
  }

  while (stack.length > 0) {
    output.push(stack.pop());
  }

  return output;
};

export const formatInfix = (infix) => {
  // Split the expression using the specified delimiter
  const infixArray = infix.expression.split(infix.delimiter);
  // Filter out any empty or whitespace-only items
  const filteredInfix = infixArray.filter((item) => item.trim() !== " ");
  return filteredInfix;
};




export const isHigherPrecedence=(x, y)=>{
  const precedence = {
    "^": 3,
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
  };
  if ((x != "^" && precedence[x] <= precedence[y]) ) {
    return true;
 }
 return false;
}
