import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../services.service";
import { Products } from "../products";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
registerLocaleData(localeFr, "fr");
@Component({
  selector: "app-productlist",
  templateUrl: "./productlist.component.html",
  styleUrls: ["./productlist.component.scss"]
})
export class ProductlistComponent implements OnInit {
  constructor(private service: ServicesService) { }
  display: Products[];
  chair: Products[];
  keyboard: Products[];
  headphone: Products[];
  mouse: Products[];
  product: Products[];
  product2: Products[];
  ngOnInit(): void {
    this.service
      .getProduct()
      .subscribe(
        response => this.pullProduct(response),
        error => console.log(error)
      );
  }
  pullProduct(list) {
    this.product = list;
    this.display = this.product.filter(item => item.type === "DIS");
    this.chair = this.product.filter(item => item.type === "CHA");
    this.headphone = this.product.filter(item => item.type === "HEA");
    this.mouse = this.product.filter(item => item.type === "MOU");
    this.keyboard = this.product.filter(item => item.type === "KEY");
  }
  onLinkClick(id) {
    document.getElementById(id).scrollIntoView();
  }
  produc: Products;
  showPro(item) {
    this.produc = item;
  }
}
