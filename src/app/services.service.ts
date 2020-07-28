import { Injectable, OnInit } from "@angular/core";
import { Products, Employ, Order, Customer, Login } from './dataBean';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
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
  login: boolean = false;
  sampleId;
  constructor(private http: HttpClient) { }
  setSampleId(id) {
    this.sampleId = id;
  }
  getSampleId(){
    return this.sampleId;
  }
  getProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.api}/products`);
  }
  getProductById(id): Observable<Products> {
    return this.http.get<Products>(`${this.api}/products/${id}`);
  }
  getEmploy(): Observable<Employ[]> {
    return this.http.get<Employ[]>(`${this.api}/employ`);
  }
  insertEmploy(employ) {
    return this.http.post<Customer>(`${this.api}/employ`, employ);
  }
  deleteEmploy(id) {
    return this.http.delete<Customer>(`${this.api}/employ/${id}`);
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
  updateCustomerByID(customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.api}/customer/${customer.id}`, customer);
  }
  getCustomerByID(id): Observable<Customer> {
    return this.http.get<Customer>(`${this.api}/customer/${id}`);
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
  getFullCartActive(id): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api}/customer/${id}/order?filter=true`);
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
