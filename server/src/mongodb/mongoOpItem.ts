import { ObjectId, Types } from "mongoose";
import Item from "../models/item";
import { ListModel } from "./mongoOpList";

export default class MangoOpItem {
    public static insertToDB(item: Item) {
        return new Promise((resolve, reject) => {
            ListModel.findById(item.listID, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (!data) {
                        reject("List not found!");
                    } else {
                        item.id = new Types.ObjectId();
                        data.items[item.id] = item;
                        data.save((listErr) => {
                            if (listErr) {
                                reject("List saving error");
                            } else {
                                resolve(item.id);
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
                        delete data.items[id];
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
    public static updateFromDB(listID: string, id: string, payload: Map<string, string|boolean|number>) {
        return new Promise((resolve, reject) => {
            ListModel.findById(listID, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (!data) {
                        reject("List not found!");
                    } else {
                        Object.entries(payload).forEach(([key, value]) => {
                            data.items[id][key] = value;
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
    public static getFromDB(listID: string, id: string) {
        return new Promise((resolve, reject) => {
            ListModel.findById(listID, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (!data) {
                        reject("List not found!");
                    } else {
                        resolve(data.items[id]);
                    }
                }
            });
        });
    }
}
