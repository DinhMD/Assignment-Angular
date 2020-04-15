import { Component, OnInit } from "@angular/core";
import { Order } from "../dataBean";
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
  ngOnInit(): void {
    this.service
      .getOrder()
      .subscribe(
        response => (this.orderlist = response),
        error => console.log(error)
      );
  }
}
