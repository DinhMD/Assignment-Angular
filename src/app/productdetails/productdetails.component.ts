import { Component, OnInit } from "@angular/core";
import { Products } from "../products";
import { ServicesService } from "../services.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-productdetails",
  templateUrl: "./productdetails.component.html",
  styleUrls: ["./productdetails.component.scss"]
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private active: ActivatedRoute
  ) {}
  produc: Products;
  ngOnInit(): void {
    this.active.params.subscribe(param => this.setProductId(param.id));
  }
  setProductId(id) {
    this.produc = this.service.getItemId(id);
  }
}
