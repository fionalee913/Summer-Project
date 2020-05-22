import MangoOpItem from "../mangodbOp/mangoOpItem";

export default class Item extends MangoOpItem {
    private title: string;
    private isCompleted: boolean;
    private listID: number;
    constructor(title: string, listID: number) {
        super();
        this.title = title;
        this.listID = listID;
        this.isCompleted = false;
    }
}
