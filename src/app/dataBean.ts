import { products } from '../../../dinhmdph07327-pt14302-angular/src/app/dataimp';
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
  export class Employ {
    id: number;
    name: String;
    usename: String;
    password: number;
  }
  export class Customer {
    id: String;
    name: String;
    username: String;
    password: String;
    phone: String;
    email: String;
    address: String;
    order: products[];
  }