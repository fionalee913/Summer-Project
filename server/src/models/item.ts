export default class Item {
    public static parse(data: {title: string, isCompleted: boolean, listID: string, id: string}): Item {
        const item: Item = new Item(data.title, data.listID);
        item.id = data.id;
        item.isCompleted = data.isCompleted;
        return item;
    }
    public title: string;
    public isCompleted: boolean;
    public listID: string;
    public id: string|null;
    public timestamp: number;
    constructor(title: string, listID: string) {
        this.title = title;
        this.listID = listID;
        this.isCompleted = false;
        this.id = null;
        this.timestamp = Date.now();
    }
}
