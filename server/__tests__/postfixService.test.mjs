import { postfix, formatInfix } from "../service/postfixService.mjs";

describe('postfix', ()=>{
 it('should return the right postfix of a basic arithmetic expression', ()=>{
   expect(postfix('(3 + 4) * 5')).toBe('3 4 + 5 *')
 })
 it('should return the right postfix of complex expression with paranthesis', ()=>{
    expect(postfix('((2 + 3) * 4) / (5 - 1)')).toBe('2 3 + 4 * 5 1 - /')
 })
 it('should return the right postfix of an expression with exponetion ' ,()=>{
    expect(postfix('2 ^ 3 ^ 2')).toBe('2 3 2 ^ ^')
 })
 it('should return the right postfix expression of mixed operation', ()=>{
   expect(postfix('3 + 4 * 2 / (1 - 5) ^ 2')).toBe('3 4 2 * 1 5 - 2 ^ / +')
 })
 it('should return the right postfix of expressions with variables', ()=>{
    expect(postfix('a + b * (c - d) / e')).toBe('a b c d - * e / +')
 })
 it('should return the right postfix of nested expressions', ()=>{
    expect(postfix('((2 * 3) + 4) * (5 - (6 / 2))')).toBe('2 3 * 4 + 5 6 2 / - *')
 })
 it('should return the right postfix of an expressions that contains decimals', ()=>{
   expect(postfix('((2 * 3) + 4) * (5.2 - (6 / 2.3))')).toBe('2 3 * 4 + 5.2 6 2.3 / - *')
})
});

describe('formatInfix', ()=>{
   it('should return an array of basic arithmetic expression with numbers and operators', ()=>{
    expect(formatInfix('3 + 4 * ( 2 - 1 )')).toEqual(['3', '+', '4', '*', '(', '2', '-', '1', ')'])
   })
   it('should return an array of expression with variables and numbers', ()=>{
    expect(formatInfix('a + b * ( c - 5 )')).toEqual(['a', '+', 'b', '*', '(', 'c', '-', '5', ')'])
   })
   it('should return an array that contains decimal numbers', ()=>{
      expect(formatInfix('2.5 / ( 1.5 + 0.5 )')).toEqual(['2.5', '/', '(', '1.5', '+', '0.5', ')'])
   })
})