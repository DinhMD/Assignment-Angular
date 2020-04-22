import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../services.service';
import { Customer, Products, Order } from '../dataBean';
import { Router, NavigationEnd } from '@angular/router';
import { resolve } from 'dns';
import { async } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router, private title: Title) { }
  page = 1;
  pageSize = 4;
  maxpage = 0;
  cartlist:Order[];
  cartPage:Order[];
  itemDel:Products;
  ngOnInit(): void {
    if (this.service.getInforLogin().id == 0){
      this.router.navigateByUrl("/login");
    }
    this.title.setTitle("Giỏ hàng");
    this.calldata();
  }
  show(item){
    this.itemDel = item;
  }
  updatecart(item){
    return new Promise(resolve =>{
      this.service.deleteCart(item.id).subscribe(data => resolve(data));
    })
  }
  calldata(){
    this.service.getCart().subscribe(responese => this.setData(responese));
  }
 async delete(product){
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
  setData(item){
    this.cartlist = item;
    this.cartPage = this.cartlist;
    this.showPage();
  }
}
