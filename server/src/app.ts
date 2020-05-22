import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import itemRouter from "./routes/item";
import listRouter from "./routes/list";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || process.env.LOCAL_DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const mongodb = mongoose.connection;
mongodb.on("open", () => console.log("Connection success to mongodb"));
mongodb.on("error", () => console.log("Connection failed to mongodb"));

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.use("/api/item", itemRouter);
app.use("/api/list", listRouter);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
