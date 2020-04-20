import { Injectable, OnInit } from "@angular/core";
import { Products, Employ, Order, Customer } from './dataBean';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { products } from '../../../dinhmdph07327-pt14302-angular/src/app/dataimp';
@Injectable({
  providedIn: "root"
})
export class ServicesService {
  api = "https://5e7eae447a92ed001655fc7c.mockapi.io";
  fullitems: Products[];
  fullOrder: Order[];
  fullEmploy: Employ[];
  fullCustomer: Customer[];
  appTitle = "Gear Shop - Gaming Gear Center";
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
  getEmploy(): Observable<Employ[]> {
    return this.http.get<Employ[]>(`${this.api}/employ`);
  }
  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.api}/customer`);
  }
  saveProduct(product): Observable<Products> {
    return this.http.post<Products>(`${this.api}/products`, product);
  }
  updateProduct(product): Observable<Products> {
    return this.http.put<Products>(`${this.api}/products/${product.id}`, product);
  }
  deleteProduct(id): Observable<Products> {
    return this.http.delete<Products>(`${this.api}/products/${id}`);  
  }
}
