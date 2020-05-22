import express from "express";
import List from "../models/list";
const router = express.Router();

router.post("/add", (req, res) => {
    const list = new List(req.body.title);
    List.insertToDB(list)
        .then((id) => res.status(200).json({id}))
        .catch(() => res.status(500).send());
});

router.post("/delete", (req, res) => {
    List.deleteFromDB(req.body.id)
        .then((id) => res.status(200).json({id}))
        .catch(() => res.status(500).send());
});

router.get("/:id", (req, res) => {
    List.getFromDB(Number(req.params.id))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500).send());
});

router.get("/", (_, res) => {
    List.getAllFromDB()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500).send());
});

export default router;
