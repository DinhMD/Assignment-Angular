import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Products } from '../dataBean';
import { ServicesService } from "../services.service";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { ActivatedRoute,Router, NavigationEnd } from "@angular/router";
import { Route } from '@angular/compiler/src/core';
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
      Đang cập nhật dữ liệu..
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
      Vui lòng đợi lấy dữ liệu..
  </button>
  `
})
export class modalLoadPro {
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
  <button class="btn btn-danger w-100">
      <span class="spinner-border spinner-border-sm"></span>
      Đang xóa..
  </button>
  `
})
export class modalDelPro {
  constructor(
    public activeModal: NgbActiveModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
}
@Component({
  selector: "app-manager-product",
  templateUrl: "./manager-product.component.html",
  styleUrls: ["./manager-product.component.scss"]
})
export class ManagerProductComponent implements OnInit {
  litsItem: Products[];
  constructor(
    private service: ServicesService,
    private activate: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) {}
  items: Products[];
  mySubscription: any;
  ngOnInit(): void {
    this.callData();
  }
  callData(){
    this.openVerticallyCentered(modalLoadPro);
    this.service
    .getProduct()
    .subscribe(
      response => this.pullItem(response),
      error => console.log(error)
    );
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { size: 'sm' });
  }
  pullItem(list) {
    this.litsItem = list;
    this.items = this.litsItem;
    this.showItem();
  }

  showItem() {
    this.activate.params.subscribe(param =>
      param.type === "all" || param.type == null
        ? (this.items = this.litsItem)
        : (this.items = this.litsItem.filter(
            items => items.type === param.type
          ))
    );
    this.modalService.dismissAll();
  }
  showfullItem() {
    this.items = this.litsItem;
  }
  product: Products;
  setProductDetail(item) {
    this.product = item;
  }

  setDefaultSearch() {
    let ty = (document.querySelector("#selectS") as HTMLSelectElement).value;
    let tx = (document.querySelector("#textS") as HTMLInputElement).value = null;
    this.searchPro("", ty);
  }
  searchPro(text, ts) {
    let tb = (document.querySelector("#table") as HTMLTableElement).children;
    
    if (text != "") {
    if (ts == "id") {
        for(var i = 0; i < tb.length; i++) {
          if (tb[i].children[0].innerHTML != text) {
            (tb[i] as HTMLElement).style.display = 'none';
          }
        }
    }

    if (ts == "name") {
      for(var i = 0; i < tb.length; i++) {
        if (tb[i].children[1].innerHTML.toLowerCase().indexOf(text.toLowerCase()) > -1) {
          (tb[i] as HTMLElement).style.display = '';
        } else {
          (tb[i] as HTMLElement).style.display = 'none';
        }
      }
    }

    if (ts == "count") {
      for(var i = 0; i < tb.length; i++) {
        if (tb[i].children[3].innerHTML == text) {
          (tb[i] as HTMLElement).style.display = '';
        } else {
          (tb[i] as HTMLElement).style.display = 'none';
        }
      }
    }

    if (ts == "price") {
      for(var i = 0; i < tb.length; i++) {
        if (tb[i].children[2].innerHTML == text) {
          (tb[i] as HTMLElement).style.display = '';
        } else {
          (tb[i] as HTMLElement).style.display = 'none';
        }
      }
    }

  } else {
    for(var i = 0; i < tb.length; i++) {
        (tb[i] as HTMLElement).style.display = '';
    }
  }
  }
  itemDel: Products;
  setDeleteId(item) {
    this.itemDel = item;
  }
  delete(pro){
    this.openVerticallyCentered(modalDelPro);
    this.service.deleteProduct(pro.id).subscribe(data => this.callData());
  }
  productForm: Products;
  ////////////////////////
  titleP="Thông tin sản phẩm";
  picturelink;
  picwarning;
  idwarning;
  namewarning;
  pricewarning;
  setPicture(url) {
    this.picturelink = url;
  }
  checkData(){
    let name = (document.querySelector("#name2") as HTMLInputElement);
    let price = (document.querySelector("#price2") as HTMLInputElement);
    let image = (document.querySelector("#picture2") as HTMLInputElement);
    let id = (document.querySelector("#id2") as HTMLInputElement);
    let type = (document.querySelector("#type2") as HTMLSelectElement);
    let count = (document.querySelector("#count2") as HTMLInputElement);
    let sale = (document.querySelector("#sale2") as HTMLInputElement);
    let desc = (document.querySelector("#desc2") as HTMLTextAreaElement);
    let check = true;
    if (name.value == "") {
      check = false;
      name.style.border = "solid 1px red";
      name.style.boxShadow = "0px 0px 5px red";
    } else {
      name.style.border = "solid 1px lightgray";
      name.style.borderBottom = "solid 3px green";
      name.style.boxShadow = "0px 0px 0px red";
    }
    if (price.value == "0" || price.value == "" || parseInt(price.value) < 0) {
      check = false;
      price.style.border = "solid 1px red";
      price.style.boxShadow = "0px 0px 5px red";
    } else {
      price.style.border = "solid 1px lightgray";
      price.style.borderBottom = "solid 3px green";
      price.style.boxShadow = "0px 0px 0px red";
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
    if (type.value == "") {
      check = false;
      type.style.border = "solid 1px red";
      type.style.boxShadow = "0px 0px 5px red";
    } else {
      type.style.border = "solid 1px lightgray";
      type.style.borderBottom = "solid 3px green";
      type.style.boxShadow = "0px 0px 0px red";
    }
    if (count.value == "" || parseInt(count.value) < 0) {
      count.value = "0";
    }
    if (sale.value == "" || parseInt(sale.value) < 0) {
      sale.value = "0";
    }
    if (check) {
      return true;
    } else {
      return false;
    }
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
      this.openVerticallyCentered(modalUpdatePro);
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
    this.callData();
  }
}
