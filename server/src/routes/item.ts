import express from "express";
import Item from "../models/item";
import {MangoOpItem} from "../mongodb/mongoOpItem";
const router = express.Router();
/**
 * @swagger
 * paths:
 *   /api/item/add:
 *     post:
 *       summary: add a new item
 *       parameters:
 *         - in: body
 *           name: item
 *           description: The new item to create
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - listID
 *             properties:
 *               title:
 *                 type: string
 *               listID:
 *                 type: string
 *                 descroption: id of list where the item belongs
 *       responses:
 *         200:
 *           description: id of newly created item
 *         500:
 *           description: error
 */
router.post("/add", (req, res) => {
    const item = new Item(req.body.title, req.body.listID);
    MangoOpItem.insertToDB(item)
        .then((id) => res.status(200).json({id}))
        .catch(() => res.status(500).send());
});

/**
 * @swagger
 * paths:
 *   /api/item/delete:
 *     post:
 *       summary: delete an item
 *       parameters:
 *         - in: body
 *           name: item
 *           description: The new item to create
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - listID
 *             properties:
 *               id:
 *                 type: string
 *                 description: item id
 *               listID:
 *                 type: string
 *                 descroption: id of list where the item belongs
 *       responses:
 *         200:
 *           description: success
 *         500:
 *           description: error
 */

router.post("/delete", (req, res) => {
    MangoOpItem.deleteFromDB(req.body.listID, req.body.id)
        .then(() => res.status(200).send())
        .catch((err) => res.status(500).send(err));
});

/**
 * @swagger
 * paths:
 *   /api/item/update:
 *     post:
 *       summary: update an item.
 *       parameters:
 *         - in: body
 *           name: item
 *           description: The new item to be updated
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - listID
 *             properties:
 *               id:
 *                 type: string
 *                 description: item id
 *               listID:
 *                 type: string
 *                 descroption: id of list where the item belongs
 *               isCompleted:
 *                  type: boolean
 *               title:
 *                  type: string
 *       responses:
 *         200:
 *           description: success
 *         500:
 *           description: error
 */

router.post("/update", (req, res) => {
    const {listID, id, ...payload} = req.body;
    MangoOpItem.updateFromDB(listID, id, payload)
        .then(() => res.status(200).send())
        .catch((err) => res.status(500).send(err));
});
/**
 * @swagger
 * paths:
 *   /api//item/{listID}/{id}:
 *     get:
 *       summary: get an item
 *       parameters:
 *         - in: path
 *           name: listID
 *           description: id of list where the item belongs
 *           required: true
 *         - in: path
 *           name: id
 *           description: id of item
 *           required: true
 *       responses:
 *         200:
 *           description: object of item
 *         500:
 *           description: error
 */
router.get("/:listID/:id", (req, res) => {
    MangoOpItem.getFromDB(req.params.listID, req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).send(err));
});

export default router;
