
export const calculate = (infix) => {
  const postfixExpression = postfix(infix, true); 
  console.log("in calculate: " + postfixExpression)
  if (postfixExpression instanceof Error) {
    return postfixExpression; 
  }
  const stack = [];
  const variablePattern = /^[a-zA-Z]+$/;
  const replacedVariablesArray = postfixExpression.map((element) => {
    if (variablePattern.test(element)) {
      // Check if the variable exists in the 'infix' object
      return infix[element] !== undefined ? infix[element] : element;
    }
    return element;
  });
  console.log(replacedVariablesArray)
 
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
    console.log("in calculate the result" +stack[0])
    return stack[0];
  } else {
    console.log(new Error("Invalid postfix expression"))
    return new Error("Invalid postfix expression");
  }
};

export const postfix = (infix) => {
  const filteredInfix = formatInfix(infix);
  const regexVar = new RegExp("^[a-zA-Z0-9]+(\\.[0-9]+)?|[0-9]+(\\.[0-9]+)?$", "i");
  const regexOp = new RegExp("^[+\\-*/^]$");

  const output = [];
  const stack = [];

  for (let i = 0; i < filteredInfix.length; i++) {
    const token = filteredInfix[i];

    if (token.includes(' ')) {
      throw new Error('Invalid expression: Spaces within tokens.');
    }

    if (regexVar.test(token)) {
      output.push(token);
    } else if (regexOp.test(token)) {
      if (token === '^' && (!filteredInfix[i + 1] || !(/^[a-zA-Z0-9]+$/.test(filteredInfix[i + 1])))) {
        throw new Error('Invalid expression: No exponent specified.');
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
        throw new Error('Invalid expression: Unbalanced parentheses.');
      }
    } else {
      throw new Error(`Invalid expression: Invalid token '${token}'.`);
    }
  }

  while (stack.length > 0) {
    if (stack[stack.length - 1] === "(") {
      throw new Error('Invalid expression: Unbalanced parentheses.');
    }
    output.push(stack.pop());
  }

  const postfixExpression = output.join(' ').replace(/[()]/g, '').split(' ');

  if (postfixExpression.some(token => !regexVar.test(token) && !regexOp.test(token))) {
    throw new Error('Invalid expression: Contains invalid characters.');
  }

  return postfixExpression;
};



export const formatInfix = (infix) => {
  // Use a regular expression to split the expression
  const infixArray = infix.expression.match(/[-+*/^()]|\d+\.\d+|\d+|\w+/g);
  // Filter out any empty items
  const filteredInfix = infixArray.filter((item) => item.trim() !== "");
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