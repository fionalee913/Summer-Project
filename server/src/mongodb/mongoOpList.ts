import { Document, model, Model, ObjectId, Schema } from "mongoose";
import Item from "../models/item";
import List from "../models/list";

interface IList extends Document {
    title: string;
    items?: Item[];
}
const schema =  new Schema({
    items: [{type: ObjectId, ref: "Item"}],
    title: { type: String, required: true },
});
const ListModel = model<IList>("List", schema);

export default class MangoOpList {
    public static insertToDB(data: List) {
        return new Promise((resolve, reject) => {
            const list = ListModel({
                title:  data.title,
            });
            list.save((err, l) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(l.id);
                }
            });
        });
    }
    public static deleteFromDB(id: string) {
        return new Promise((resolve, reject) => {
            ListModel.findByIdAndRemove(id, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            } );
        });
    }
    public static getFromDB(id: string) {
        return new Promise((resolve, reject) => {
            ListModel.findById(id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (!data) {
                        resolve({});
                    } else {
                        resolve(List.parse(data));
                    }
                }
            } );
        });
    }
    public static getAllFromDB() {
        return new Promise((resolve, reject) => {
            resolve({message: "hello!"});
        });
    }
}
