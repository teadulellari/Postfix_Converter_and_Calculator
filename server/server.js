import express from "express";
import postfixRouter from "./routes/postfixRouter.js";

const app = express();
const port = 3001;
//changed here 1
app.use(express.json());
app.use("/api", postfixRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
