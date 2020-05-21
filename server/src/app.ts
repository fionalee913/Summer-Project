import express from "express";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile("index.html");
});
app.get("/api", (req, res) => {
    res.json({
        good: "good",
        morning: "morning",
    });
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
