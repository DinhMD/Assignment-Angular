import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { ServicesService } from "../services.service";
import { Products } from '../dataBean';
import { NgForm } from '@angular/forms';
import { threadId } from 'worker_threads';
import { Router, NavigationEnd } from '@angular/router';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngbd-modal-content',
  styles: [`
    .dark-modal .modal-content {
      background-color: rgba(#292b2c, 0);
    }
  `],
  template: `
  <button class="btn btn-primary w-100">
      <span class="spinner-border spinner-border-sm"></span>
      Đang lưu..
  </button>
  `
})
export class modalUpdatePro {
  constructor(
    public activeModal: NgbActiveModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
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
      Đợi một lát..
  </button>
  `
})
export class modalLoadForm {
  constructor(
    public activeModal: NgbActiveModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
}
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private router: Router,
    private modalService: NgbModal
  ) { }
  listItem: Products[];
  picturelink;
  picwarning;
  namewarning;
  pricewarning;
  typewarning;
  idNof = "( Nhập ID để sửa thông tin sản phẩm, để trống nếu thêm mới! )";
  save = "Thêm sản phẩm";
  product:Products;
  add: boolean = true;
  nof = "( ID sẽ tự động sinh hoặc nhập ID để tìm sản phẩm cần sửa )";
  ngOnInit(): void {
    this.product = new Products();
    this.calldata();
  }
  openModal(content){
    this.modalService.open(content, {size:'sm', centered: false});
  }
  calldata(){
    this.openModal(modalLoadForm);
    this.service
    .getProduct()
    .subscribe(
      response => this.closeModal(response)
    );
  }
  closeModal(data){
    this.listItem = data;
    this.modalService.dismissAll();
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
      this.nof = "( Bạn đang sửa thông tin sản phẩm )";
      this.add = false;
      this.idNof = "( Bạn đang sửa sản phẩm có ID này )";
      this.checkData();
    } else {
      name.value = "";
      price.value = "0";
      sale.value = "0";
      desc.value = "";
      img.value = "";
      type.value = "";
      count.value = "";
      this.picturelink = "";
      this.save = "Thêm sản phẩm";
      this.nof = "( ID sẽ tự động sinh hoặc nhập ID để tìm sản phẩm cần sửa )";
      this.idNof = "( Nhập ID để sửa thông tin sản phẩm, để trống nếu thêm mới! )"
      this.add = true;
      this.checkData();
    }
  }
  checkData(){
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
    if (name.value == "") {
      check = false;
      this.namewarning = 'Tên không được để trống!'
      name.style.border = "solid 2px red";
      name.style.boxShadow = "0px 0px 5px red";
    } else {
      this.namewarning = "";
      name.style.border = "solid 1px lightgray";
      name.style.borderBottom = "solid 3px green";
      name.style.boxShadow = "0px 0px 0px red";
    }
    if (price.value == "0" || price.value == "" ||  parseInt(price.value) < 0) {
      this.pricewarning = 'Giá không được để trống!';
      if (parseInt(price.value) < 0) {this.pricewarning = 'Giá không được nhỏ hơn 0'};
      check = false;
      price.style.border = "solid 2px red";
      price.style.boxShadow = "0px 0px 5px red";
    }  else {
      this.pricewarning = "";
      price.style.border = "solid 1px lightgray";
      price.style.borderBottom = "solid 3px green";
      price.style.boxShadow = "0px 0px 0px red";
    }
    if (image.value == "") {
      this.picwarning = 'Ảnh không được để trống!'
      check = false;
      image.style.border = "solid 2px red";
      image.style.boxShadow = "0px 0px 5px red";
    } else {
      this.picwarning = "";
      image.style.border = "solid 2px lightgray";
      image.style.borderBottom = "solid 3px green";
      image.style.boxShadow = "0px 0px 0px red";
    }
    if (type.value == "") {
      this.typewarning = 'Vui lòng chọn loại sản phẩm!'
      check = false;
      type.style.border = "solid 2px red";
      type.style.boxShadow = "0px 0px 5px red";
    } else {
      this.typewarning = "";
      type.style.border = "solid 1px lightgray";
      type.style.borderBottom = "solid 3px green";
      type.style.boxShadow = "0px 0px 0px red";
    }
    if (sale.value == "" || parseInt(sale.value) < 0) {
      sale.value = "0";
    }
    if (count.value == "" || parseInt(count.value) < 0) {
      count.value = "0";
    }
    if (check) {
      return true;
    } else {
      return false;
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
    if (this.checkData()) {
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
      this.openModal(modalUpdatePro);
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
    count.value = "0";
    this.picturelink = "";
    this.save = "Thêm sản phẩm";
    this.setNUll();
    this.router.navigateByUrl('/manager');
  }
  addProduct(pro) {
    if (this.add) {
      this.service.saveProduct(pro).subscribe(data =>  this.router.navigateByUrl('/manager'));
    } else {
      this.service.updateProduct(pro).subscribe(data =>  this.router.navigateByUrl('/manager'));
    }
  }
}
