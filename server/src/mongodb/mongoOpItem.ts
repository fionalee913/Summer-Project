import Item from "../models/item";

export default class MangoOpItem {
    public static insertToDB(data: Item) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    public static deleteFromDB(id: string) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    public static getFromDB(id: string) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}
