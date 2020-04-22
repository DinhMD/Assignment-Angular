import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { Employ, Customer } from '../dataBean';
import { promises, resolve } from 'dns';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    private service: ServicesService
    ) { }
  account: Employ[];
  Cusaccount: Customer[];
  ngOnInit(): void {
    this.titleService.setTitle("Gear Shop - Đăng nhập");
    this.service.getEmploy().subscribe(responese => this.account = responese);
    this.service.getCustomer().subscribe(responese => this.Cusaccount = responese);
  }
  async checkLogin(f){
    let admin = this.account.find(item => item.username == f.value.username && item.password == f.value.password);
    let customer = this.Cusaccount.find (item => item.username == f.value.username && item.password == f.value.password) ;
    if (admin != null) {
        this.service.setLogin(true);
        this.router.navigate(["/manager"])
    } else {
      if (customer != null) {
        this.service.setInforLogin(customer.id, customer.name, "Đăng xuất");
        this.service.updateCustomer({login: true});
        this.router.navigate(["/home"])
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác!");
    }
  }
  }
}
