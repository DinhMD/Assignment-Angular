import { Component, OnInit, Input } from '@angular/core';
import { Products } from "../products";
import { ServicesService } from "../services.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-manager-product-detail',
  templateUrl: './manager-product-detail.component.html',
  styleUrls: ['./manager-product-detail.component.scss']
})
export class ManagerProductDetailComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private active: ActivatedRoute
  ) { }
  product: Products;
  @Input('data') set load(value: Products){
    this.product = value;
  };
  picturelink;
  picwarning;
  idwarning;
  namewarning;
  pricewarning;
  ngOnInit(): void {
  }
  openData(productset) {
    console.log("Productset: " + productset.image);
      let name = (document.querySelector("#name2") as HTMLInputElement);
      let price = (document.querySelector("#price2") as HTMLInputElement);
      let sale = (document.querySelector("#sale2") as HTMLInputElement);
      let desc = (document.querySelector("#desc2") as HTMLInputElement);
      let img = (document.querySelector("#picture2") as HTMLInputElement);
      let type = (document.querySelector("#type2") as HTMLInputElement);
      let count = (document.querySelector("#count2") as HTMLInputElement);
      let idinp = (document.querySelector("#id2") as HTMLInputElement);
      // console.log(name);
      // name.value = "" + productset.name;
      // price.value = "" + productset.price;
      // sale.value = "" + productset.sale;
      // desc.value = "" + productset.desc;
      // img.value = "" + productset.image;
      // type.value = "" + productset.type;
      // count.value = "" + productset.count;
      // idinp.value = "" + productset.id;
      this.picturelink = productset.image;
  }
  setPicture(url) {
    this.picturelink = url;
  }
  saveData() {
    let name = (document.querySelector("#name2") as HTMLInputElement);
    let price = (document.querySelector("#price2") as HTMLInputElement);
    let img = (document.querySelector("#picture2") as HTMLInputElement);
    let idinp = (document.querySelector("#id2") as HTMLInputElement);
    var check: Boolean;
    check = true;
    if (idinp.value == "") {
      check = false;
      idinp.style.border = "solid 1px red";
      idinp.style.boxShadow = "0px 0px 5px red";
    } else {
      idinp.style.border = "solid 1px lightgray";
      idinp.style.borderBottom = "solid 3px green";
      idinp.style.boxShadow = "0px 0px 0px red";
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
    if (img.value == "") {
      check = false;
      img.style.border = "solid 1px red";
      img.style.boxShadow = "0px 0px 5px red";
    } else {
      img.style.border = "solid 1px lightgray";
      img.style.borderBottom = "solid 3px green";
      img.style.boxShadow = "0px 0px 0px red";
    }
    if (check) {
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
  }
}
