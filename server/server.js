import express from "express";
import cors from 'cors';
import postfixRouter from "./routes/postfixRouter.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Postfix Processer"
    },
    servers: [
      {
        url: "http://localhost:3001"
      }
    ]
    
  },
  apis: ["./routes/*.js"]
}
const specs = swaggerJSDoc(options);
const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
const port = 3001;
app.use(cors());
//changed here 1
app.use(express.json());
app.use("/api", postfixRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
