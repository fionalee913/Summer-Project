import express from "express";
import Item from "../models/item";
const router = express.Router();

router.post("/add", (req, res) => {
    const item = new Item(req.body.title, req.body.listID);
    Item.insertToDB(item)
        .then((id) => res.status(200).json({id}))
        .catch(() => res.status(500).send());
});

router.post("/delete", (req, res) => {
    Item.deleteFromDB(req.body.id)
        .then((id) => res.status(200).json({id}))
        .catch(() => res.status(500).send());
});

router.get("/:id", (req, res) => {
    Item.getFromDB(String(req.params.id))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500).send());
});

export default router;
