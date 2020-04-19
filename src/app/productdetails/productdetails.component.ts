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
  textType;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.active.params.subscribe(param => this.setProduct(param.id));
  }
  setProduct(id){
    this.service.getProduct().subscribe(responese => this.setProductId(responese, id));
  }
  setProductId(pro, id) {
    this.id = id;
    (document.querySelector("#input-count") as HTMLInputElement).value = "1";
    this.produc = pro.find(item => item.id == id);
    switch (this.produc.type) {
      case "DIS": { this.textType = "Màn hình"; break; }
      case "CHA": { this.textType = "Ghế"; break; }
      case "KEY": { this.textType = "Bàn phím"; break; }
      case "HEA": { this.textType = "Tai nghe";break; }
      case "MOU": { this.textType = "Chuột"; break; }
    }
    this.titleService.setTitle("Gear Shop - " + this.produc.name);
    console.log(this.produc);
    this.productType = pro.filter(item => item.type == this.produc.type && item.id != id);
    console.log(this.productType);
  }
  checkValue(index) {
    if (index > this.produc.count) {
      (document.querySelector("#input-count") as HTMLInputElement).value = "" + this.produc.count;
    } else if (index != "" && index < 1) {
      (document.querySelector("#input-count") as HTMLInputElement).value = "1";
    }
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
