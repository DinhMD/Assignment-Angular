import { Component, OnInit } from "@angular/core";
import { Order, Customer } from '../dataBean';
import { ServicesService } from "../services.service";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-manager-oder",
  templateUrl: "./manager-oder.component.html",
  styleUrls: ["./manager-oder.component.scss"]
})
export class ManagerOderComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private activate: ActivatedRoute
  ) { }
  orderlist: Order[];
  customer: Customer[];
  ngOnInit(): void {
    this.orderlist = [];
    this.service.getCustomer().subscribe(data => this.getAllOrder(data));
  }
  getAllOrder(data) {
    this.customer = data;
    for (var i = 0; i < data.length; i++) {
      this.service.getFullCartActive(data[i].id).subscribe(data => (this.orderlist =  this.orderlist.concat(data)));
    }
  }
}
