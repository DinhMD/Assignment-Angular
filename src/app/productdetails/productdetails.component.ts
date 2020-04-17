import { Component, OnInit } from "@angular/core";
import { Products } from "../dataBean";
import { ServicesService } from "../services.service";
import { ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
@Component({
  selector: "app-productdetails",
  templateUrl: "./productdetails.component.html",
  styleUrls: ["./productdetails.component.scss"]
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private active: ActivatedRoute,
    private titleService: Title
  ) { }
  produc: Products;
  productType: Products[];
  id;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.active.params.subscribe(param => this.setProductId(param.id));
  }
  checkValue(index) {
    if (index > this.produc.count) {
      (document.querySelector("#input-count") as HTMLInputElement).value = "" + this.produc.count;
    } else if (index != "" && index < 1) {
      (document.querySelector("#input-count") as HTMLInputElement).value = "1";
    }
  }
  setProductId(id) {
    this.id = id;
    (document.querySelector("#input-count") as HTMLInputElement).value = "1";
    this.produc = this.service.getItemId(id);
    this.titleService.setTitle("Gear Shop - " + this.produc.name);
    this.setProductType(this.produc.type);
  }
  setProductType(type) {
    this.productType = this.service.getItemType(type);
    this.productType = this.productType.filter(item => item.id != this.id);
  }
  setCount(action) {
    let max = parseInt((document.querySelector("#input-count") as HTMLInputElement).max);
    let inp = (document.querySelector("#input-count") as HTMLInputElement);
    let index = parseInt(inp.value);
    if (action == "+") {
      if (index < max) {
        index++;
      }
    } else {
      if (index > 1) {
        index--;
      }
    }
    inp.value = "" + index;
  }
}
