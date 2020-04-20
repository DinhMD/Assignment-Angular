import { Component, OnInit, Output } from '@angular/core';
import { ServicesService } from "../services.service";
import { Products } from '../dataBean';
import { NgForm } from '@angular/forms';
import { threadId } from 'worker_threads';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private router: Router
  ) { }
  listItem: Products[];
  picturelink;
  picwarning;
  idwarning;
  namewarning;
  pricewarning;
  save = "Thêm sản phẩm";
  product:Products;
  add: boolean = true;
  ngOnInit(): void {
    this.product = new Products();
    this.service
      .getProduct()
      .subscribe(
        response => this.listItem = response,
        error => console.log(error)
      );
  }
  setPicture(url) {
    this.picturelink = url;
  }
  findID(id) {
    
    let name = (document.querySelector("#name") as HTMLInputElement);
    let price = (document.querySelector("#price") as HTMLInputElement);
    let sale = (document.querySelector("#sale") as HTMLInputElement);
    let desc = (document.querySelector("#desc") as HTMLInputElement);
    let img = (document.querySelector("#picture") as HTMLInputElement);
    let type = (document.querySelector("#type") as HTMLInputElement);
    let count = (document.querySelector("#count") as HTMLInputElement);
    let item = this.listItem.find(item => item.id === id);
    if (item != null) {
      name.value = "" + item.name;
      price.value = "" + item.price;
      sale.value = "" + item.sale;
      desc.value = "" + item.desc;
      img.value = "" + item.image;
      type.value = "" + item.type;
      count.value = "" + item.count;
      this.picturelink = item.image;
      this.save = "Sửa sản phẩm";
      this.add = false;
    } else {
      name.value = "";
      price.value = "0";
      sale.value = "0";
      desc.value = "";
      img.value = "";
      type.value = "";
      count.value = "";
      this.picturelink = "";
      this.save = "Thêm sản phẩm"
      this.add = true;
    }
  }
  saveData() {
    let name = (document.querySelector("#name") as HTMLInputElement);
    let price = (document.querySelector("#price") as HTMLInputElement);
    let image = (document.querySelector("#picture") as HTMLInputElement);
    let id = (document.querySelector("#id") as HTMLInputElement);
    let type = (document.querySelector("#type") as HTMLSelectElement);
    let count = (document.querySelector("#count") as HTMLInputElement);
    let sale = (document.querySelector("#sale") as HTMLInputElement);
    let desc = (document.querySelector("#desc") as HTMLTextAreaElement);
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
      console.log(pro);
      this.save = "Lưu thành công";
      this.addProduct(pro);
      this.setNUll();
    }
  }
  setNUll() {
    let name = (document.querySelector("#name") as HTMLInputElement);
    let price = (document.querySelector("#price") as HTMLInputElement);
    let img = (document.querySelector("#picture") as HTMLInputElement);
    let idinp = (document.querySelector("#id") as HTMLInputElement);
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
    let name = (document.querySelector("#name") as HTMLInputElement);
    let price = (document.querySelector("#price") as HTMLInputElement);
    let sale = (document.querySelector("#sale") as HTMLInputElement);
    let desc = (document.querySelector("#desc") as HTMLInputElement);
    let img = (document.querySelector("#picture") as HTMLInputElement);
    let type = (document.querySelector("#type") as HTMLInputElement);
    let count = (document.querySelector("#count") as HTMLInputElement);
    let idinp = (document.querySelector("#id") as HTMLInputElement);
    idinp.value = "";
    name.value = "";
    price.value = "0";
    sale.value = "0";
    desc.value = "";
    img.value = "";
    type.value = "";
    count.value = "";
    this.picturelink = "";
    this.save = "Thêm sản phẩm";
    this.setNUll();
  }
  addProduct(pro) {
    if (this.add) {
      this.service.saveProduct(pro).subscribe(data =>  window.location.reload());
    } else {
      this.service.updateProduct(pro).subscribe(data =>  window.location.reload());
    }
  }
}
