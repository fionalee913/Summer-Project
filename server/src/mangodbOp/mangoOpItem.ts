import Item from "../models/item";

export default class MangoOpItem {
    public static insertToDB(data: Item) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    public static deleteFromDB(id: number) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    public static getFromDB(id: number) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}
