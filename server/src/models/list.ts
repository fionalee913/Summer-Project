import { listenerCount } from "cluster";
import MangoOpList from "../mongodb/mongoOpList";
import Item from "./item";

export default class List extends MangoOpList {
    public static parse(data: {title: string, id: string, items: []}): List {
        const list: List = new List(data.title);
        list.id = data.id;
        data.items.forEach((item) => {
            list.addItem(
                Item.parse(item),
            );
        });
        return list;
    }
    public title: string;
    public items: Item[];
    public id: string | null;
    constructor(title: string) {
        super();
        this.title = title;
        this.items = [];
        this.id = null;
    }
    private addItem(i: Item) {
        this.items.push(i);
    }
    private removeItem(i: Item) {
        return;
    }
}
