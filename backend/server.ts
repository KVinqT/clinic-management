import express from "express";
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello TypeScript");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});