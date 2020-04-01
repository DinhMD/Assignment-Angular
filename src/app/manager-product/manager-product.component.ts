import { Component, OnInit } from "@angular/core";
import { Products } from "../products";
import { ServicesService } from "../services.service";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-manager-product",
  templateUrl: "./manager-product.component.html",
  styleUrls: ["./manager-product.component.scss"]
})
export class ManagerProductComponent implements OnInit {
  litsItem: Products[];
  constructor(
    private service: ServicesService,
    private activate: ActivatedRoute
  ) {}
  items: Products[];
  ngOnInit(): void {
    this.service
      .getProduct()
      .subscribe(
        response => this.pullItem(response),
        error => console.log(error)
      );
  }
  pullItem(list) {
    this.litsItem = list;
    this.items = this.litsItem;
    this.showItem();
  }

  showItem() {
    this.activate.params.subscribe(param =>
      param.type === "all"
        ? (this.items = this.litsItem)
        : (this.items = this.litsItem.filter(
            items => items.type === param.type
          ))
    );
  }
  showfullItem() {
    this.items = this.litsItem;
  }
}
