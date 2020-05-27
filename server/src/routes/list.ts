import express from "express";
import List from "../models/list";
import { MangoOpList } from "../mongodb/mongoOpList";

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /list/add:
 *     post:
 *       summary: add a new list
 *       parameters:
 *         - in: body
 *           name: list
 *           description: The new list to create
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *       responses:
 *         200:
 *           description: id of the newly created list
 *         500:
 *           description: error
 */
router.post("/add", (req, res) => {
    const list = new List(req.body.title);
    MangoOpList.insertToDB(list)
        .then((id) => res.status(200).json({ id }))
        .catch((err) => res.status(500).send(err));
});
/**
 * @swagger
 * paths:
 *   /list/delete:
 *     post:
 *       summary: delete an existing list
 *       parameters:
 *         - in: body
 *           name: list
 *           description: The list to be removed
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *       responses:
 *         200:
 *           description: success
 *         500:
 *           description: error
 */
router.post("/delete", (req, res) => {
    MangoOpList.deleteFromDB(String(req.body.id))
        .then(() => res.status(200).send())
        .catch((err) => res.status(500).send(err));
});
/**
 * @swagger
 * paths:
 *   /list/update:
 *     post:
 *       summary: update an existing list
 *       parameters:
 *         - in: body
 *           name: list
 *           description: The list to be updated
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *       responses:
 *         200:
 *           description: success
 *         500:
 *           description: error
 */
router.post("/update", (req, res) => {
    const { id, ...payload } = req.body;
    MangoOpList.updateFromDB(req.body.id, payload)
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
});

/**
 * @swagger
 * paths:
 *   /list/{id}:
 *     get:
 *       summary: get a list
 *       parameters:
 *         - in: path
 *           name: id
 *           description: The list to be retrieved
 *           required: true
 *       responses:
 *         200:
 *           description: list object
 *         500:
 *           description: error
 */

router.get("/:id", (req, res) => {
    MangoOpList.getFromDB(String(req.params.id))
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).send(err));
});

/**
 * @swagger
 * paths:
 *   /list:
 *     get:
 *       summary: get all lists
 *       responses:
 *         200:
 *           description: array of list object
 *         500:
 *           description: error
 */

router.get("/", (_, res) => {
    MangoOpList.getAllFromDB()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500).send());
});

export default router;
