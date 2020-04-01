import { Injectable, OnInit } from "@angular/core";
import { Products } from "./products";
import { Order } from "./products";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ServicesService {
  api = "https://5e7eae447a92ed001655fc7c.mockapi.io";
  fullitems: Products[];
  fullOrder: Order[];
  constructor(private http: HttpClient) {}
  getProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.api}/products`);
  }
  getProductById(id): Observable<Products> {
    return this.http.get<Products>(`${this.api}/products/${id}`);
  }
  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api}/order`);
  }
  setFullItem(item) {
    this.fullitems = item;
  }
  getItemId(id) {
    return this.fullitems.find(product => product.id === id);
  }
  getItemType(type){
    return this.fullitems.filter(product => product.type === type)
  }
  getFullItem() {
    return this.fullOrder;
  }
  getFullOrder() {
    return this.fullOrder;
  }
}
