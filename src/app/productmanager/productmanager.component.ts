import { Component, OnInit } from '@angular/core';
import { Products, Login } from '../dataBean';
import { ServicesService } from '../services.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productmanager',
  templateUrl: './productmanager.component.html',
  styleUrls: ['./productmanager.component.scss']
})

export class ProductmanagerComponent implements OnInit {
  constructor(
    private titleService : Title,
    private service: ServicesService,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.titleService.setTitle("Gear Shop - Manager Center");
    this.checkLogin();
  }
  checkLogin(){
      if (this.service.getLogin() == false) {
        this.router.navigate(["/login"]);
      }
  }
  clearLogin(){
    this.service.setLogin(false);
  }
  showToggle(){
    (document.querySelector(".homeSubmenu") as HTMLElement).style.height = "0";
  }
}
