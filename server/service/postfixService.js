
// this is fkin service as it process data and DOES NOTHING with HTTP ENDPOINT
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
  const regexVar = new RegExp("^[a-zA-Z0-9]+$");
  const regexOp = new RegExp("^[+\\-*/^]$");
  for (let i = 0; i < infix.length; i++) {
    if (regexVar.test(infix[i])) {
      output.push(infix[i]);
    } else if (regexOp.test(infix[i])) {
      while (
        stack.length > 0 &&
        precedence[stack[stack.length - 1]] >= precedence[infix[i]] &&
        stack[stack.length - 1] !== "("
      ) {
        output.push(stack.pop());
      }
      stack.push(infix[i]);
    } else if (infix[i] === "(") {
      stack.push(infix[i]);
    } else if (infix[i] === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop(); // Remove the opening parenthesis
    }
  }

  while (stack.length > 0) {
    output.push(stack.pop());
  }
  console.log("beko")
  console.log(output)
  return output.join(' ');
};


