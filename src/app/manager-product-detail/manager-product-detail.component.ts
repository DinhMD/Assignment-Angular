import { Component, OnInit, Input } from '@angular/core';
import { Products } from "../dataBean";
import { ServicesService } from "../services.service";
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { resolve } from 'dns';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-manager-product-detail',
  templateUrl: './manager-product-detail.component.html',
  styleUrls: ['./manager-product-detail.component.scss']
})
export class ManagerProductDetailComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private active: ActivatedRoute,
    private router: Router
  ) { }
  product: Products;
  @Input('data') set load(value: Products){
    this.product = value;
  };
  titleP="Thông tin sản phẩm";
  picturelink;
  picwarning;
  idwarning;
  namewarning;
  pricewarning;
  ngOnInit(): void {
  }
  setPicture(url) {
    this.picturelink = url;
  }
  saveData() {
    let name = (document.querySelector("#name2") as HTMLInputElement);
    let price = (document.querySelector("#price2") as HTMLInputElement);
    let image = (document.querySelector("#picture2") as HTMLInputElement);
    let id = (document.querySelector("#id2") as HTMLInputElement);
    let type = (document.querySelector("#type2") as HTMLSelectElement);
    let count = (document.querySelector("#count2") as HTMLInputElement);
    let sale = (document.querySelector("#sale2") as HTMLInputElement);
    let desc = (document.querySelector("#desc2") as HTMLTextAreaElement);
    var check: Boolean;
    check = true;
    if (id.value == "") {
      check = false;
      id.style.border = "solid 1px red";
      id.style.boxShadow = "0px 0px 5px red";
    } else {
      id.style.border = "solid 1px lightgray";
      id.style.borderBottom = "solid 3px green";
      id.style.boxShadow = "0px 0px 0px red";
    }
    if (name.value == "") {
      check = false;
      name.style.border = "solid 1px red";
      name.style.boxShadow = "0px 0px 5px red";
    } else {
      name.style.border = "solid 1px lightgray";
      name.style.borderBottom = "solid 3px green";
      name.style.boxShadow = "0px 0px 0px red";
    }
    if (price.value == "0" || price.value == "") {
      check = false;
      price.style.border = "solid 1px red";
      price.style.boxShadow = "0px 0px 5px red";
    }
    if (image.value == "") {
      check = false;
      image.style.border = "solid 1px red";
      image.style.boxShadow = "0px 0px 5px red";
    } else {
      image.style.border = "solid 1px lightgray";
      image.style.borderBottom = "solid 3px green";
      image.style.boxShadow = "0px 0px 0px red";
    }
    if (check) {
      let pro = {
        id: parseInt(id.value),
        type: type.value,
        count: parseInt(count.value),
        name: name.value,
        price: parseInt(price.value),
        sale: parseInt(sale.value),
        image: image.value,
        desc: desc.value
      }
      this.titleP ="Lưu thành công";
      this.updateProduct(pro);
      this.setNUll();
    }
  }
  setNUll() {
    let name = (document.querySelector("#name2") as HTMLInputElement);
    let price = (document.querySelector("#price2") as HTMLInputElement);
    let img = (document.querySelector("#picture2") as HTMLInputElement);
    let idinp = (document.querySelector("#id2") as HTMLInputElement);
    img.style.border = "solid 1px lightgray";
    img.style.borderBottom = "solid 3px green";
    img.style.boxShadow = "0px 0px 0px red";

    idinp.style.border = "solid 1px lightgray";
    idinp.style.borderBottom = "solid 3px green";
    idinp.style.boxShadow = "0px 0px 0px red";

    price.style.border = "solid 1px lightgray";
    price.style.borderBottom = "solid 3px green";
    price.style.boxShadow = "0px 0px 0px red";

    name.style.border = "solid 1px lightgray";
    name.style.borderBottom = "solid 3px green";
    name.style.boxShadow = "0px 0px 0px red";
    
  }
  closeForm() {
    this.titleP = "Thông tin sản phẩm";
  }
  updatedata(pro) {
    return new Promise (resolve => {
      this.service.updateProduct(pro).subscribe(data => resolve(data));
    })
  }
 async updateProduct(pro) {
    await this.updatedata(pro);
    window.location.reload();
  }
}
