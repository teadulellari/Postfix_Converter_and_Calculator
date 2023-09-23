import { calcultate, postfix } from '../service/postfixService.mjs';
export const postfixConverter = (req, res) =>{
    const infix = req.body;
    try{
    const output = postfix(infix);
    res.status(200).send({result: output.join(' ').replace(new RegExp(infix.delimiter, "g"), ' ')});
    }catch(error){
      res.status(404).send(error);
    }
}
export const postfixCalculator = (req, res) => {
 try {
  const infix = req.body;
  const output = calcultate(infix);
  res.status(200).send({result: output});
 } catch (error) {
  res.status(404).send(error);
 }
}