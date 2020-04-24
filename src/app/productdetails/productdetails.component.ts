import { Component, OnInit } from "@angular/core";
import { Products } from '../dataBean';
import { ServicesService } from "../services.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { resolve } from 'dns';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  styles: [`
    .dark-modal .modal-content {
      background-color: rgba(#292b2c, 0);
    }
  `],
  template: `
  <button class="btn btn-success w-100">
      Thêm thành công!
  </button>
  `
})
export class modalDetail {
  constructor(public activeModal: NgbActiveModal) { }
}
@Component({
  selector: 'ngbd-modal-content',
  styles: [`
    .dark-modal .modal-content {
      background-color: rgba(#292b2c, 0);
    }
  `],
  template: `
  <button class="btn btn-warning w-100">
      <span class="spinner-border spinner-border-sm"></span>
      Vui lòng đợi lấy dữ liệu..
  </button>
  `
})
export class modalLoad {
  constructor(public activeModal: NgbActiveModal) { }
}
@Component({
  selector: "app-productdetails",
  templateUrl: "./productdetails.component.html",
  styleUrls: ["./productdetails.component.scss"],
  providers: [NgbModalConfig, NgbModal]
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private active: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  produc = new Products;
  productType: Products[];
  id;
  textType;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.openVerticallyCentered(modalLoad);
    this.active.params.subscribe(param => this.setProduct(param.id));
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { size: 'sm' });
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
    this.modalService.dismissAll();
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
    let check = cart.find(item => item.itemId == this.produc.id && item.status == false);
    if (check == null) {
      let item = {
        count: parseInt((document.querySelector("#input-count") as HTMLInputElement).value),
        name: this.produc.name,
        price: this.produc.price,
        sale: this.produc.sale,
        image: this.produc.image,
        itemId: this.produc.id,
        status: false
      }
      this.config.keyboard = true;
      this.service.addcart(item).subscribe(data => this.commitsucess());
    } else {
      let totals = check.count + parseInt((document.querySelector("#input-count") as HTMLInputElement).value);
      if (totals > this.produc.count) {
        totals = this.produc.count;
      }
      let item = {
        id: check.id,
        count: totals,
        status: false
      }
      this.config.keyboard = true;
      this.service.updateCart(item).subscribe(data => this.commitsucess());
    }
  }
  commitsucess(){
    this.openVerticallyCentered(modalDetail);
    setTimeout(() => {
      this.modalService.dismissAll();
    },1000);
  }
  insertCart(content) {
    if (this.service.getInforLogin().id == 0) {
      this.router.navigateByUrl("/login");
    } else {
      this.config.keyboard = false;
      this.openVerticallyCentered(content);
      this.getcart();
    }
  }
  ////////////////////////////////////////////////
  payNow(content) {
    if (this.service.getInforLogin().id == 0) {
      this.router.navigateByUrl("/login");
    } else {
      this.openVerticallyCentered(content);
      this.getcartNow();
    }
  }
  getcartNow() {
    this.service.getCart().subscribe(data => this.commitcartNow(data));
  }
  commitcartNow(cart) {
    let check = cart.find(item => item.itemId == this.produc.id && item.status == false);
    if (check == null) {
      let item = {
        count: parseInt((document.querySelector("#input-count") as HTMLInputElement).value),
        name: this.produc.name,
        price: this.produc.price,
        sale: this.produc.sale,
        image: this.produc.image,
        itemId: this.produc.id,
        status: false
      }
      this.service.addcart(item).subscribe(data => this.setNullModalandRedirect());
      this.modalService.dismissAll();
    } else {
      let totals = check.count + parseInt((document.querySelector("#input-count") as HTMLInputElement).value);
      if (totals > this.produc.count) {
        totals = this.produc.count;
      }
      let item = {
        id: check.id,
        count: totals,
        status: false
      }
      this.service.addcart(item).subscribe(data => this.setNullModalandRedirect());
    }
  }
  setNullModalandRedirect(){
    this.modalService.dismissAll();
    this.router.navigateByUrl("/home/cart");
  }

  ////////////////////////////////////////
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
