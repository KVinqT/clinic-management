import express from "express";
import clinicRouter from "./routers/clinicRouter";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const port = 3000;
const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "may-clinic API",
      version: "1.0.0",
      description: "A simple CRUD project for pet clinic management system",
    },
    servers: [
      {
        url: "http://localhost:3000/clinic",
      },
    ],
  },
  apis: ["./routers/*.ts"],
};

const specs = swaggerJsDoc(options);
app.use("/clinic/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());

app.use("/clinic", clinicRouter);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
