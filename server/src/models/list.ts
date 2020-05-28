import Item from "./item";

export default class List {
    public static parse(data: {title: string, id: string, items: Item[], timestamp: number}): List {
        const list: List = new List(data.title);
        list.id = data.id;
        list.timestamp = data.timestamp;
        const items = Object.values(data.items).sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
        items.forEach((item) => {
            list.addItem(
                Item.parse(item),
            );
        });
        return list;
    }
    public title: string;
    public items: Item[];
    public id: string | null;
    public timestamp: number;
    constructor(title: string) {
        this.title = title;
        this.items = [];
        this.id = null;
        this.timestamp = Date.now();
    }
    private addItem(i: Item) {
        this.items.push(i);
    }
    private removeItem(i: Item) {
        return;
    }
}
