
export const calculate = (infix) => {
  const postfixExpression = postfix(infix, true); 
  if (postfixExpression instanceof Error) {
    return postfixExpression; 
  }
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
      console.log(stack);
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
    return stack[0];
  } else {
    console.log(new Error("Invalid postfix expression"))
    return new Error("Invalid postfix expression");
  }
};


export const postfix = (infix) => {
  const filteredInfix = formatInfix(infix);
  const regexVar = new RegExp("^[a-zA-Z0-9]+(\\.[0-9]+)?|[0-9]+(\\.[0.9]+)?$", "i");
  const regexOp = new RegExp("^[+\\-*/^]$");

  let previousToken = null;
  const output = [];
  const stack = [];

  for (let i = 0; i < filteredInfix.length; i++) {
    const token = filteredInfix[i];

    if (token.includes(' ')) {
      return new Error('Invalid expression: Spaces within tokens.');
    }

    if (regexVar.test(token)) {
      output.push(token); 
    } else if (regexOp.test(token)) {
      if (token === '^' && (!filteredInfix[i + 1] || !(/^[a-zA-Z0-9]+$/.test(filteredInfix[i + 1])))) {
        return new Error('Invalid expression: No exponent specified.');
      }

      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== "(" &&
        (
          (isHigherPrecedence(token, stack[stack.length - 1]) && token !== "^") ||
          (isHigherPrecedence(token, stack[stack.length - 1]) && token === "^")
        )
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      if (stack.length === 0 || stack.pop() !== "(") {
        return new Error('Invalid expression: Unbalanced parentheses.');
      }
    } else {
      return new Error(`Invalid expression: Invalid token '${token}'.`);
    }

    previousToken = token;
  }

  while (stack.length > 0) {
    if (stack[stack.length - 1] === "(") {
      return new Error('Invalid expression: Unbalanced parentheses.');
    }
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

export const isValidExpression = (infix) =>{
   
  
  return true;
}

 
  



