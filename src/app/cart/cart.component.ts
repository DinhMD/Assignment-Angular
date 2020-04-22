import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../services.service';
import { Customer, Products, Order } from '../dataBean';
import { Router, NavigationEnd } from '@angular/router';
import { resolve } from 'dns';
import { async } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { privateEncrypt } from 'crypto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class CartComponent implements OnInit {

  constructor(
    private service: ServicesService,
    private router: Router,
    private title: Title,
    private modalService: NgbModal
  ) { }
  page = 1;
  pageSize = 4;
  maxpage = 0;
  cartlist: Order[];
  cartPage: Order[];
  itemDel: Products;
  closeResult: string;
  customer: Customer;
  ngOnInit(): void {
    if (this.service.getInforLogin().id == 0) {
      this.router.navigateByUrl("/login");
    }
    this.title.setTitle("Giỏ hàng");
    this.calldata();
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  show(item) {
    this.itemDel = item;
  }
  updatecart(item) {
    return new Promise(resolve => {
      this.service.deleteCart(item.id).subscribe(data => resolve(data));
    })
  }
  calldata() {
    this.service.getCart().subscribe(responese => this.setData(responese));
  }
  async delete(product) {
    await this.updatecart(product);
    this.calldata();
    this.showPage();
  }
  showPage() {
    this.maxpage = Math.ceil(this.cartlist.length / 6) * 10;
    let index = 0;
    if (this.cartlist.length > 6) {
      for (var i = 1; i < this.page; i++) {
        index += 6;
      }
    }
    this.cartPage = this.cartlist.slice(index, index + 6);
  }
  setData(item) {
    this.cartlist = item;
    this.cartPage = this.cartlist;
    this.service.getCustomerID().subscribe(data => this.customer = data);
    this.showPage();
  }
  sum = 0;
  pay = [];
  addPay() {
    this.sum = 0
    this.pay = [];
    let row = (document.querySelector("#tableCart") as HTMLElement).children;
    for (let i = 0; i < row.length; i++) {
      if ((row[i].firstChild.firstChild as HTMLInputElement).checked) {
        let id = (row[i].firstChild.lastChild as HTMLInputElement).value;
        let itemId = (row[i].children[0].children[1] as HTMLInputElement).value;
        let name = row[i].children[2].innerHTML;
        let count = (row[i].children[3].firstChild.firstChild as HTMLInputElement).value;
        let price = (row[i].children[4].firstChild as HTMLInputElement).value;
        this.sum += parseInt(price);
        let item = { id: id, itemId: itemId, name: name, count: count, price: price };
        this.pay.push(item);
      }
    }
  }
  activeCart(item) {
    return new Promise(resolve => {
      this.service.updateCart(item).subscribe(data => resolve(data));
    })
  }
  getproduct(id) {
    return new Promise(resolve => {
      this.service.getProductById(id).subscribe(data => resolve(data));
    })
  }
  updateProduct(item, pro) {
    return new Promise(resolve => {
      // this.service.getProductById(item.id).subscribe(data => console.log(data));
      // console.log(product);
      let newCount = {
        id: item.id,
        type: pro.type,
        count: pro.count - item.count,
        name: pro.name,
        price: pro.price,
        sale: pro.sale,
        image: pro.image,
        desc: pro.desc
      }
      // pro.count - item.count;
      console.log(pro);
      console.log(pro.count - item.count + "--" + pro.count + "--" + item.count);
      // console.log(newCount);
      this.service.updateProduct(newCount).subscribe(data => resolve(data));
    })
  }
  async payCart(content) {
    if (this.pay.length == 0) {
      alert("Vui lòng chọn mặt hàng trong giỏ hàng để thực hiện thanh toán!")
    } else {
      for (let index = 0; index < this.pay.length; index++) {
        let item = { id: this.pay[index].itemId, count: this.pay[index].count };
        await this.activeCart({ id: this.pay[index].id, status: true });
        console.log(item.id);
        var product = await this.getproduct(item.id);
        console.log(await this.updateProduct(item, product));

      }
      this.openVerticallyCentered(content);
      this.calldata();
      this.pay = [];
      this.sum = 0;
    }
  }
}
