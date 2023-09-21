export const postfix = (infix) => {
  let stack = [];
  let output = [];
  const precedence = {
    "^": 3,
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
  };
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
        precedence[stack[stack.length - 1]] >= precedence[filteredInfix[i]] &&
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

  console.log("this is the output: " + output.join(''));
  return output.join('');
};

export const formatInfix = (infix) => {
  const regexPattern = /([a-zA-Z0-9]+(?:\.\d+)?|[+\-*^()])/g;
  const infixArray = infix.split(regexPattern);
  const filteredInfix = infixArray.filter(Boolean);
  console.log(filteredInfix);
  return filteredInfix;
};
