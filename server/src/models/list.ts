import MangoOpList from "../mangodbOp/mangoOpList";
import Item from "./item";

export default class List extends MangoOpList {
    private title: string;
    private item: Item[];
    constructor(title: string) {
        super();
        this.title = title;
        this.item = [];
    }
    public addItem(i: Item) {
        this.item.push(i);
    }
    public removeItem(i: Item) {
        return;
    }
}
