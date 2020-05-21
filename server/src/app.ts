import express from "express";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("../client/dist"));
app.get("/", (req, res) => {
    res.sendFile("index.html");
});
app.get("/api", (req, res) => {
    res.json({
        good: "good",
        morning: "morning",
    });
});
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
