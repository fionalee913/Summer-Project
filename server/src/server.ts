import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import itemRouter from "./routes/item";
import listRouter from "./routes/list";

const app = express();
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

const swaggerDefinition = {
  basePath: "/api", // Base path (optional),
  info: {
    // API informations (required)
    title: "TODO List API", // Title (required)
    version: "1.0.0", // Version (required)
  },
};
const options = {
  apis: ["./src/routes/*.ts"], // <-- not in the definition, but in the options
  swaggerDefinition,

};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
