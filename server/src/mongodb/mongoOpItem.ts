import { Types } from "mongoose";
import Item from "../models/item";
import { ListModel } from "./mongoOpList";

// interface IItemSchema extends Document {
//     isCompleted: boolean;
//     timestamp: number;
//     title: string;
// }

export class MangoOpItem {
    public static insertToDB(item: Item) {
        return new Promise((resolve, reject) => {
            ListModel.findById(item.listID, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (!data) {
                        reject("List not found!");
                    } else {
                        const itemID = new Types.ObjectId();
                        data.items.push({
                            ...item,
                            _id: itemID,
                        });
                        data.save((listErr) => {
                            if (listErr) {
                                reject("List saving error");
                            } else {
                                resolve(itemID);
                            }
                        });
                    }
                }
            });
        });
    }
    public static deleteFromDB(listID: string, id: string) {
        return new Promise((resolve, reject) => {
            ListModel.findById(listID, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (!data) {
                        reject("List not found!");
                    } else {
                        const item = data.items.id(id);
                        if (!item) {
                            reject("Item not found!");
                        } else {
                            item.remove();
                            data.save((listErr) => {
                                if (listErr) {
                                    reject("List saving error");
                                } else {
                                    resolve();
                                }
                            });
                        }
                    }
                }
            });
        });
    }
    public static updateFromDB(listID: string, id: string, payload: Map<string, string | boolean | number>) {
        return new Promise((resolve, reject) => {
            ListModel.findById(listID, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (!data) {
                        reject("List not found!");
                    } else {
                        const item = data.items.id(id);
                        if (!item) {
                            reject("Item not found");
                        } else {
                            Object.entries(payload).forEach(([key, value]) => {
                                item[key] = value;
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
                }
            });
        });
    }
    public static getFromDB(listID: string, id: string) {
        return new Promise((resolve, reject) => {
            ListModel.findById(listID, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (!data) {
                        reject("List not found!");
                    } else {
                        const item = data.items.id(id);
                        if (item) {
                            resolve(Item.parse(item));
                        } else {
                            resolve({});
                        }
                    }
                }
            });
        });
    }
}
