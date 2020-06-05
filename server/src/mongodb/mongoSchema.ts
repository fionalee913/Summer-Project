import { Schema } from "mongoose";

const ItemSchema =  new Schema({
    isCompleted: {type: Boolean, required: true},
    listID: { type: String, required: true },
    timestamp: {type: Number, required: true},
    title: { type: String, required: true },
});

export const ListSchema =  new Schema({
    items:   [ItemSchema],
    timestamp: {type: Number, required: true},
    title: { type: String, required: true },
});
