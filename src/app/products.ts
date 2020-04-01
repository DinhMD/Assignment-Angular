export class Products {
    id: number;
    type: String;
    count: number;
    name: String;
    price: number;
    sale: number;
    image: String;
    desc: String;
  }
  export class Order {
    id: number;
    customer: String;
    items: Products[];
    price: number;
    date: String;
  }
  