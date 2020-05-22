import bodyParser from "body-parser";
import express from "express";
import itemRouter from "./routes/item";
import listRouter from "./routes/list";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.use("/api/item", itemRouter);
app.use("/api/list", listRouter);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
