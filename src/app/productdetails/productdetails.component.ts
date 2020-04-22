import { Component, OnInit } from "@angular/core";
import { Products } from '../dataBean';
import { ServicesService } from "../services.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { resolve } from 'dns';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';

@Component({
  selector: "app-productdetails",
  templateUrl: "./productdetails.component.html",
  styleUrls: ["./productdetails.component.scss"]
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private active: ActivatedRoute,
    private titleService: Title,
    private router: Router
  ) { }
  produc = new Products;
  productType: Products[];
  id;
  textType;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.active.params.subscribe(param => this.setProduct(param.id));
  }
  setProduct(id) {
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
      case "HEA": { this.textType = "Tai nghe"; break; }
      case "MOU": { this.textType = "Chuột"; break; }
    }
    this.titleService.setTitle("Gear Shop - " + this.produc.name);
    this.productType = pro.filter(item => item.type == this.produc.type && item.id != id);
  }
  checkValue(index) {
    if (index > this.produc.count) {
      (document.querySelector("#input-count") as HTMLInputElement).value = "" + this.produc.count;
    } else if (index != "" && index < 1) {
      (document.querySelector("#input-count") as HTMLInputElement).value = "1";
    }
  }
  getcart() {
      this.service.getCart().subscribe(data => this.commitcart(data));
  }
commitcart(cart) {
    console.log(cart);
    let check = cart.find(item => item.itemId == this.produc.id);
    console.log(check);
    console.log(this.produc.id);
    if (check == null) {
      let item = {
        count: parseInt((document.querySelector("#input-count") as HTMLInputElement).value),
        name: this.produc.name,
        price: this.produc.price,
        sale: this.produc.sale,
        image: this.produc.image,
        itemId:this.produc.id,
      }
      this.service.addcart(item).subscribe(data => alert("Thêm thành công!"));
    } else {
      let item = {
        id: check.id,
        count: check.count + parseInt((document.querySelector("#input-count") as HTMLInputElement).value)
      }
      this.service.updateCart(item).subscribe(data => alert("Thêm thành công!"));
    }
    
    
  }
  insertCart() {
    if (this.service.getInforLogin().id == 0) {
      this.router.navigateByUrl("/login");
    } else {
      this.getcart();
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
