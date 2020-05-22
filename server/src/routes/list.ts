import express from "express";
import List from "../models/list";
const router = express.Router();

router.post("/add/", (req, res) => {
    const list = new List(req.body.title);
    List.insertToDB(list)
        .then((id) => res.status(200).json({id}))
        .catch((err) => res.status(500).send(err));
});

router.post("/delete/", (req, res) => {
    List.deleteFromDB(req.body.id)
        .then(() => res.status(200).send())
        .catch((err) => res.status(500).send(err));
});

router.get("/:id/", (req, res) => {
    List.getFromDB(String(req.params.id))
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).send(err));
});

router.get("/", (_, res) => {
    List.getAllFromDB()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500).send());
});

export default router;
