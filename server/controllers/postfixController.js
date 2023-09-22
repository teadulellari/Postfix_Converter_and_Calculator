import { postfix } from '../service/postfixService.mjs';
// this is a fked up code that just takes the stuff to another class/ function instead of doing it on controller (in your case , in router)
export const postfixController = (req, res) =>{
    const infix = req.body;
    try{
    const output = postfix(infix);
    res.status(200).send(output);
    }catch(error){
      res.status(404).send(error);
      console.log("this is error" + error);
    }
}
