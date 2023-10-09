export const calculate = (infix) => {
  const postfixExpression = postfix(infix, true);
  if (postfixExpression instanceof Error) {
    return postfixExpression;
  }
  const stack = [];
  const variablePattern = /^[a-zA-Z]+$/;

  const replacedVariablesArray = postfixExpression.map((element) => {
   
    if (variablePattern.test(element)) {
      // Check if the variable exists in the 'variables' object
      return infix.variables[element] !== undefined
        ? infix.variables[element]
        : element;
    }
    return element;
  });
  
  for (let element of replacedVariablesArray) {
    if (element === " ") {
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
    console.log("in calculate the result" + stack[0]);
    return stack[0];
  } else {
    console.log(new Error("Invalid postfix expression"));
    return new Error("Invalid postfix expression");
  }
};

export const postfix = (infix) => {
  const filteredInfix = formatInfix(infix);

  if (filteredInfix instanceof Error) {
    return filteredInfix;
  }

  const output = [];
  const stack = [];
  const regexVar = new RegExp(
    "^[a-zA-Z0-9]+(\\.[0-9]+)?|[0-9]+(\\.[0-9]+)?$",
    "i"
  );
  const regexOp = new RegExp("^[+\\-*/^]$");

  for (let i = 0; i < filteredInfix.length; i++) {
    const token = filteredInfix[i];

    if (regexVar.test(token)) {
      output.push(token);
    } else if (regexOp.test(token)) {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== "(" &&
        ((isHigherPrecedence(token, stack[stack.length - 1]) &&
          token !== "^") ||
          (isHigherPrecedence(token, stack[stack.length - 1]) && token === "^"))
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
      stack.pop();
    }
  }

  while (stack.length > 0) {
    output.push(stack.pop());
  }

  const postfixExpression = output.join(" ").replace(/[()]/g, "").split(" ");

  return postfixExpression;
};

export const formatInfix = (infix) => {
  const expression = infix.expression;
  let openParenthesisCount = 0;
  let previousToken = null;
  const output = [];

  const delimiter = infix.delimiter || " ";

  for (let i = 0; i < expression.length; i++) {
    const token = expression[i];

    // Skip delimiter character
    if (token === delimiter) {
      continue;
    }

    // Check for invalid characters
    if (/[^a-zA-Z\d+\-*/^().\s]+/.test(token)) {
      return new Error(`Invalid character in expression: '${token}'`);
    }

    // Check for unbalanced parentheses
    if (token === "(") {
      openParenthesisCount++;
    } else if (token === ")") {
      openParenthesisCount--;
      if (openParenthesisCount < 0) {
        return new Error("Invalid expression: Unbalanced parentheses.");
      }
    }

    // Check for invalid separators
    if (
      /[-+*/^]/.test(token) &&
      previousToken &&
      /[-+*/^]/.test(previousToken)
    ) {
      return new Error(
        `Invalid separator in expression: '${previousToken}${token}'`
      );
    }

    if (/[-+*/^]/.test(token)) {
      output.push(token);
    } else {

      // Check for decimal numbers (e.g., "1.23")
      if (/^[0-9]+$/.test(token)) {
        if (expression[i + 1] === "." && /^[0-9]+$/.test(expression[i + 2])) {
          output.push(`${token}.${expression[i + 2]}`);
          i += 2; // Skip the next two characters
        } else {
          output.push(token);
        }
      } else {
        output.push(token);
      }
    }

    // Check for exponent
    if (token === "^") {
      let j = i + 1;
      while (j < expression.length && expression[j].trim() === "") {
        j++;
      }
      if (j === expression.length || !/^[a-zA-Z0-9]+$/.test(expression[j])) {
        return new Error("Invalid expression: No exponent specified.");
      }
    }

    previousToken = token;
  }

  // Check for incomplete expressions
  if (/[-+*/^]/.test(output[output.length - 1])) {
    return new Error("Invalid expression: Incomplete expression.");
  }

  // Check for unbalanced parentheses at the end
  if (openParenthesisCount !== 0) {
    return new Error("Invalid expression: Unbalanced parentheses.");
  }

  const filteredInfix = output.filter((item) => item.trim() !== "");
  console.log(filteredInfix);
  return filteredInfix;
};

export const isHigherPrecedence = (x, y) => {
  const precedence = {
    "^": 3,
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
  };
  if (x != "^" && precedence[x] <= precedence[y]) {
    return true;
  }
  return false;
};
