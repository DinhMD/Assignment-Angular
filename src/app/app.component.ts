import { Component, OnInit } from "@angular/core";
import { Products } from "./dataBean";
import { Order } from "./dataBean";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServicesService } from "./services.service";
import { Title } from '@angular/platform-browser';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Davidmai";
  api = "https://5e7eae447a92ed001655fc7c.mockapi.io";
  fullitems: Products[];
  fullOrder: Order[];
  constructor(private http: HttpClient, private service: ServicesService, private titleService: Title) { }
  ngOnInit(): void {
    this.getProduct().subscribe(
      response => this.setItem(response),
      error => console.log(error)
    );
  }
  setItem(item) {
    this.service.setFullItem(item);
    this.titleService.setTitle("Gear Shop - Gaming Gear Center");
  }
  getProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.api}/products`);
  }
}
