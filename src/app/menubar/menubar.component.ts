import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  btnLoginName = "Đăng nhập";
  nameuser = "";
  cartzise = 0;
  constructor(
    private router: Router,
    private service: ServicesService
  ) { }

  ngOnInit(): void {
    this.btnLoginName = this.service.getInforLogin().btn;
    this.nameuser = this.service.getInforLogin().name;
    if (this.service.getInforLogin().id != 0) {
      (document.querySelector(".btn-sign") as HTMLElement).style.display = "none";
    } else {
      (document.querySelector(".btn-sign") as HTMLElement).style.display = "block";
    }
    (document.querySelector(".dropForBtn") as HTMLElement).style.opacity = "0";
    (document.querySelector(".dropForBtn") as HTMLElement).style.visibility =
      "hidden";
  }
  showMenu() {
    (document.querySelector(".dropForBtn") as HTMLElement).style.opacity = "1";
    (document.querySelector(".dropForBtn") as HTMLElement).style.visibility =
      "visible";
  }
  hideMenu() {
    if ((document.querySelector(".dropForBtn") as HTMLElement).style.visibility == "visible") {
      (document.querySelector(".dropForBtn") as HTMLElement).style.opacity = "0";
      (document.querySelector(".dropForBtn") as HTMLElement).style.visibility =
        "hidden";
    }
  }
  search(form) {
    if (form.value.textSearch != "") {
      this.router.navigate(["home/search/" + form.value.textSearch]);
    }

  }
  loginorlogout(){
    let loginfor = this.service.getInforLogin();
    if (loginfor.id == 0) {
      this.router.navigateByUrl("/login");
    } else {
      this.service.updateCustomer({login: false});
      (document.querySelector(".btn-sign") as HTMLElement).style.display = "block";
      this.btnLoginName = "Đăng nhập";
      this.nameuser = "";
      this.cartzise = 0;
      this.service.setInforLogin(0,"", "Đăng nhập");
      this.router.navigateByUrl("/home");
    }
  }
}
