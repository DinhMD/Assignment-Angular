import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { resolve } from 'dns';
import { ServicesService } from '../services.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
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
export class SignComponent implements OnInit {

  constructor(private titleService: Title, private service: ServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gear Shop - Đăng ký");
  }
  closeResult: string;
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  addCustomer(item) {
    return new Promise(resolve => {
      this.service.insertCustomer(item).subscribe(data => resolve(data));
    })
  }
  close() {
    this.router.navigateByUrl("/login");
  }
  checkAccount(f,content) {
    this.service.getCustomer().subscribe(data => this.createAccount(f, content, data));
  }
  async createAccount(f, content, listcustomer) {
    if (!f.valid) {
      alert("Vui lòng nhập đầy đủ thông tin")
    } else {
      let cus = listcustomer.find(item => (item.email == f.value.email || item.phone == f.value.phone))
      if (cus != null) {
        alert("Thông tin tài khoản này đã tồn tại!");
      } else {
        await this.addCustomer({
          name: f.value.name,
          username: f.value.username,
          password: f.value.password,
          phone: f.value.phone,
          email: f.value.email,
          address: f.value.address
        });
        this.openVerticallyCentered(content);
      }
    }
  }
  checkp: boolean = false;
  checkPass(pa, rpa) {
    if (pa == rpa) {
      this.checkp = true;
    } else {
      this.checkp = false;
    }
  }
}
