import express from "express";
import Item from "../models/item";
import {MangoOpItem} from "../mongodb/mongoOpItem";
const router = express.Router();

router.post("/add", (req, res) => {
    const item = new Item(req.body.title, req.body.listID);
    MangoOpItem.insertToDB(item)
        .then((id) => res.status(200).json({id}))
        .catch(() => res.status(500).send());
});

router.post("/delete", (req, res) => {
    MangoOpItem.deleteFromDB(req.body.listID, req.body.id)
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
});

router.post("/update", (req, res) => {
    const {listID, id, ...payload} = req.body;
    MangoOpItem.updateFromDB(listID, id, payload)
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
});

router.get("/:listID/:id", (req, res) => {
    MangoOpItem.getFromDB(req.params.listID, req.params.id)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500).send());
});

export default router;
