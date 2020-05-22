import List from "../models/list";

export default class MangoOpList {
     public static insertToDB(data: List) {
        return new Promise((resolve, reject) => {
            reject();
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
    public static getAllFromDB() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}
