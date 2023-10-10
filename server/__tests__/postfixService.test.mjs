import { postfix, formatInfix, calculate } from "../service/postfixService.mjs";

describe("postfix", () => {
  it("should return the right postfix of a basic arithmetic expression", () => {
    expect(postfix({expression:"(3 + 4) * 5", delimiter: " "})).toEqual(["3", "4", "+", "5", "*"]);
  });
  it("should return the right postfix of a complex expression with paranthesis", () => {
    expect(postfix({expression:"((2 + 3) * 4) / (5 - 1)", delimiter:" "})).toEqual(["2", "3", "+", "4", "*", "5", "1", "-", "/"]);
  });
  it("should return the right postfix of an expression with exponetion", () => {
    expect(postfix({expression: "2 ^ 3 ^ 2", delimiter: " "})).toEqual(["2", "3", "2", "^", "^"]);
  });
  it("should return the right postfix expression of mixed operations", () => {
    expect(postfix({expression:"3 + 4 * 2 / (1 - 5) ^ 2", delimiter: " "})).toEqual(["3", "4", "2", "*", "1", "5", "-", "2", "^", "/", "+"]);
  });
  it("should return the right postfix of expressions with variables", () => {
    expect(postfix({expression:"a + b * (c - d) / e", delimiter: " "})).toEqual(["a", "b", "c", "d", "-", "*", "e", "/", "+"]);
  });
  it("should return the right postfix of a nested expressions", () => {
    expect(postfix({expression:"((2 * 3) + 4) * (5 - (6 / 2))", delimiter:" "})).toEqual(
      ["2", "3", "*", "4", "+", "5", "6", "2", "/", "-", "*"]
    );
  });
  it("should return the right postfix of an expressions that contains decimals", () => {
    expect(postfix({expression:"((2 * 3) + 4) * (5.2 - (6 / 2.3))", delimiter: " "})).toEqual(
      ["2", "3", "*", "4", "+", "5.2", "6", "2.3", "/", "-", "*"]
    );
  });
});

describe("formatInfix", () => {
  it("should return an array of basic arithmetic expression with numbers and operators", () => {
    expect(formatInfix({expression:"3 + 4 * ( 2 - 1 )", delimiter:" "})).toEqual([
      "3",
      "+",
      "4",
      "*",
      "(",
      "2",
      "-",
      "1",
      ")",
    ]);
  });
  it("should return an array of expression with variables and numbers", () => {
    expect(formatInfix({expression: "a,+,b,*,(,c,-,5,)", delimiter: ","})).toEqual([
      "a",
      "+",
      "b",
      "*",
      "(",
      "c",
      "-",
      "5",
      ")",
    ]);
  });
  it("should return an array that contains decimal numbers", () => {
    expect(formatInfix({expression: "2.5 / ( 1.5 + 0.5 )", delimiter: " "})).toEqual([
      "2.5",
      "/",
      "(",
      "1.5",
      "+",
      "0.5",
      ")",
    ]);
  });
  it("should return an error if the expression is incomplete", () => {
    const result = formatInfix({expression: "3 - 2 +"});
    expect(result instanceof Error).toBe(true);
  });
  it("should return an error if the paranthesis are unbalanced", () => {
    const result = formatInfix({expression: "3 - (2 +"});
    expect(result instanceof Error).toBe(true);
  });
  it("should return an error if the expression contains invalid character", () => {
    const result = formatInfix({expression: "3 - 2 + @"});
    expect(result instanceof Error).toBe(true);
  });
  it("should return an error if the expression contains invalid separator", () => {
    const result = formatInfix({expression: "3*-*2*+*4"});
    expect(result instanceof Error).toBe(true);
  });
  it("should return an error if the expression has missing exponent", () => {
    const result = formatInfix({expression: "3 - 2 + 4 ^"});
    expect(result instanceof Error).toBe(true);
  });
});

describe("calculate", () => {
  it("should return the correct calculated value of an basic arithmetic expression", () => {
    expect(calculate({expression:"3 + 4 - 2", delimiter: " "})).toBe(5);
  });
  it("should return the correct calculated value of a complex expression with paranthesis", () => {
    expect(calculate({expression:"((2 + 3) * 4) / (5 - 1)", delimiter: " "})).toBe(5);
  });
  it("should return the correct calculated value of an expression with exponetion", () => {
    expect(calculate({expression:"2 ^ 3 ^ 2", delimiter: " "})).toBe(512);
  });
  it("should return the correct calculated value of an expression with mixed operations", () => {
    expect(calculate({expression: "3 + 4 * 2 / (1 - 5) ^ 2", delimiter: " "})).toBe(3.5);
  });
  it("should return the correct calculated value of an expression with variables", () => {
    expect(calculate({expression: "a + b * (c - d) / e", delimiter: " ", variables: {a: 2,
    b: 3,
    c: 5,
    d: 1,
    e: 2,} })).toBe(8);
  });

  it("should return the correct calculated value of a nested expressions", () => {
    expect(calculate({expression:"((2 * 3) + 4) * (5 - (6 / 2))", delimiter: " "})).toBe(20);
  });
  it("should return the correct calculated value of an expressions that contains decimals", () => {
    expect(calculate({expression:"((2 * 3) + 4) * (5.2 - (6 / 2.3))", delimiter: " "})).toBe(
      25.91304347826087
    );
  }); 
  it('should return an error for an expression with unbalanced parentheses', () => {
    const result = postfix({ expression: '3 + 4 * (2 - 5' });
    expect(result instanceof Error).toBe(true);
  });

  it('should return an error for an expression with invalid characters', () => {
    const result = postfix({ expression: '3 + $ * 2' });
    expect(result instanceof Error).toBe(true);
  });

  it('should return an error for an expression with missing operands', () => {
    const result = postfix({ expression: '3 +' });
    expect(result instanceof Error).toBe(true);
  });

});

//handle the error cases good in code and in the tests so they can pass  come on you can do it