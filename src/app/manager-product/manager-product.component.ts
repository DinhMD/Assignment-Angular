import { Component, OnInit, Input } from "@angular/core";
import { Products } from '../dataBean';
import { ServicesService } from "../services.service";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { ActivatedRoute,Router } from "@angular/router";
import { Route } from '@angular/compiler/src/core';
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
    private router: Router
  ) {}
  items: Products[];
  ngOnInit(): void {
    this.service
      .getProduct()
      .subscribe(
        response => this.pullItem(response),
        error => console.log(error)
      );
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
    this.service.deleteProduct(pro.id).subscribe(data => window.location.reload());
  }
}
