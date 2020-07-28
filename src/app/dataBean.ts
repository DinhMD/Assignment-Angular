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
    customerId: number;
    name: String;
    count: number;
    price: number;
    image: String; 
    itemId: number;
    status: boolean;
  }
  export class Employ {
    id: number;
    name: String;
    username: String;
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
  }
  export class Login {
    id:String;
    login:boolean;
  }