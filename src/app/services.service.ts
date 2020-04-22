import { Injectable, OnInit } from "@angular/core";
import { Products, Employ, Order, Customer, Login } from './dataBean';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ServicesService {
  api = "https://5e7eae447a92ed001655fc7c.mockapi.io";
  logapi = "https://5e7b1a7f0e04630016332aa5.mockapi.io/checklogin";
  fullitems: Products[];
  fullOrder: Order[];
  fullEmploy: Employ[];
  fullCustomer: Customer[];
  appTitle = "Gear Shop - Gaming Gear Center";
  login: boolean = false;
  constructor(private http: HttpClient) { }
  getProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.api}/products`);
  }
  getProductById(id): Observable<Products> {
    return this.http.get<Products>(`${this.api}/products/${id}`);
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
  setLogin(ck) {
    this.login = ck;
  }
  getLogin() {
    return this.login;
  }
  deleteCustomer(): Observable<Customer> {
    return this.http.delete<Customer>(`${this.api}/customer/${this.logId}`);
  }
  updateCustomer(customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.api}/customer/${this.logId}`, customer);
  }
  getCustomerID(): Observable<Customer> {
    return this.http.get<Customer>(`${this.api}/customer/${this.logId}`);
  }
  insertCustomer(customer) {
    return this.http.post<Customer>(`${this.api}/customer`, customer);
  }
  getCart(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api}/customer/${this.logId}/order`);
  }
  addcart(order): Observable<Order> {
    return this.http.post<Order>(`${this.api}/customer/${this.logId}/order`, order);
  }
  updateCart(order): Observable<Order> {
    return this.http.put<Order>(`${this.api}/customer/${this.logId}/order/${order.id}`, order);
  }
  deleteCart(id): Observable<Order> {
    return this.http.delete<Order>(`${this.api}/customer/${this.logId}/order/${id}`);
  }
  getFullCart(id): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api}/customer/${id}/order`);
  }
  logId = 0;
  logName = "";
  btnlogin = "Đăng nhập";
  setInforLogin(id, name, btn) {
    this.logId = id;
    this.logName = name;
    this.btnlogin = btn;
  }
  getInforLogin() {
    return { id: this.logId, name: this.logName, btn: this.btnlogin };
  }
}
