import { Document, Mixed, model, Schema } from "mongoose";
import List from "../models/list";
import { ListSchema } from "./mongoSchema";

interface IList extends Document {
    title: string;
    items?: [];
}
export const ListModel = model<IList>("List", ListSchema);

export class MangoOpList {
    public static insertToDB(data: List) {
        return new Promise((resolve, reject) => {
            const list = ListModel({
                title:  data.title,
            });
            list.save((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.id);
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
    public static updateFromDB(id: string, payload: Map<string, string|boolean|number>) {
        return new Promise((resolve, reject) => {
            ListModel.findById(id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (!data) {
                        reject("List not found!");
                    } else {
                        Object.entries(payload).forEach(([key, value]) => {
                            data[key] = value;
                         });
                        data.save((listErr) => {
                            if (listErr) {
                                reject("List saving error");
                            } else {
                                resolve();
                            }
                        });
                    }
                }
            });
        });
    }
    public static getAllFromDB() {
        return new Promise((resolve, reject) => {
            ListModel.find({}, (err, lists) => {
                if (err) {
                    reject(err);
                } else {
                    const result = [];
                    lists.forEach((list)  =>
                      result.push(List.parse(list)),
                    );
                    resolve(lists);
                }
            });
        });
    }
}
