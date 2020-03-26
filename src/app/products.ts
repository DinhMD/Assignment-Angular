export class Products {
    id: number;
    type: String;
    count: number;
    name: String;
    price: number;
    sale: number;
    anh: String;
}
export class Order {
    orid : number;
    Customer: String;
    item : Products[];
    price : number;
    date : Date;
}