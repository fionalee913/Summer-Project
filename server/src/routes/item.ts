import express from "express";
const router = express.Router();

router.post("/add", (req, res, next) => {
    res.send("respond with a resource");
  });
  
  router.post("/delete", (req, res, next) => {
      res.send("respond with a resource");
  });
  
  router.post("/update", (req, res, next) => {
      res.send("respond with a resource");
  });
  
  router.get("/", (req, res, next) => {
      res.send("respond with a resource");
  });

export default router;
