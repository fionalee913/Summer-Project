import express from "express";
import List from "../models/list";
import {MangoOpList} from "../mongodb/mongoOpList";

const router = express.Router();

router.post("/add/", (req, res) => {
    const list = new List(req.body.title);
    MangoOpList.insertToDB(list)
        .then((id) => res.status(200).json({id}))
        .catch((err) => res.status(500).send(err));
});

router.post("/delete/", (req, res) => {
    MangoOpList.deleteFromDB(req.body.id)
        .then(() => res.status(200).send())
        .catch((err) => res.status(500).send(err));
});

router.post("/update/", (req, res) => {
    MangoOpList.updateFromDB(req.body.id, req.body.payload)
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
});

router.get("/:id/", (req, res) => {
    MangoOpList.getFromDB(String(req.params.id))
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).send(err));
});

router.get("/", (_, res) => {
    MangoOpList.getAllFromDB()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500).send());
});

export default router;
