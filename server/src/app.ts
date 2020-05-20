import express from "express";

const app = express();
const port = 3000;
app.use(express.static("../client/dist"));
app.get("/", (req, res) => {
    res.sendFile("index.html");
});
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
