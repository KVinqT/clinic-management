import express from "express";
import clinicRouter from "./routers/clinicRouter";
const port = 3000;
const app = express();
app.use(express.json());

app.use("/clinic", clinicRouter);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
