import { calculate, postfix } from "../service/postfixService.mjs";

export const postfixConverter = (req, res) => {
  const infix = req.body;
  try {
    if (!infix) {
      throw new Error("Invalid input: The request body is missing or empty.");
    }

    const output = postfix(infix);
    if (output instanceof Error) {
      res
        .status(400)
        .send({
          error: output.message,
        });
    } else {
      res
        .status(200)
        .send({
          result: output.join(" ").replace(new RegExp(infix.delimiter, "g"), " "),
        });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

export const postfixCalculator = (req, res) => {
  const infix = req.body;
  try {
    if (!infix) {
      throw new Error("Invalid input: The request body is missing or empty.");
    }

    const output = calculate(infix);

    if (output instanceof Error) {
      res
        .status(400)
        .send({
          error: output.message,
        });
    } else {
      res.status(200).send({ result: output });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
