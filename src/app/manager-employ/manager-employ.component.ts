import { Component, OnInit } from '@angular/core';
import { Employ } from '../dataBean';
import { ServicesService } from '../services.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { resolve } from 'dns';
@Component({
  selector: 'app-manager-employ',
  templateUrl: './manager-employ.component.html',
  styleUrls: ['./manager-employ.component.scss'],
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
export class ManagerEmployComponent implements OnInit {

  constructor(
    private service: ServicesService,
    private modalService: NgbModal
  ) { }
  employ: Employ[];
  closeResult: string;
  ngOnInit(): void {
    this.calldata();
  }
  calldata() {
    this.service.getEmploy().subscribe(response => (this.employ = response), errors => console.log(errors));
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  getEmploy(f) {
    if (f.valid == false) {
      alert("Vui lòng nhập đầy đủ thông tin!")
    } else {
      this.service.getEmploy().subscribe(data => this.checkAccount(f, data));
    }
  }
  addEmploy(f) {
    return new Promise(resolve => {
      this.service.insertEmploy(f).subscribe(data => resolve(data));
    })
  }
  async checkAccount(f, employ) {
    let em = employ.find(item => item.username == f.value.username2)
    if (em != null) {
      alert("Tài khoản này đã được dùng!");
    } else {
      await this.addEmploy({ name: f.value.name2, username: f.value.username2, password: f.value.password2 })
      alert("Thêm tài khoản thành công!");
      this.modalService.dismissAll();
      this.calldata();
    }
  }
  checkp2: boolean = false;
  checkPass(pa, rpa) {
    if (pa == rpa) {
      this.checkp2 = true;
    } else {
      this.checkp2 = false;
    }
  }
  pass;
  id;
  openDelForm(content, pass, id) {
    this.modalService.open(content, { centered: true });
    this.pass = pass;
    this.id = id;
  }
  delEmploy(id) {
    return new Promise(resolve => {
      this.service.deleteEmploy(id).subscribe(data => resolve(data));
    })
  }
  async deleteEmply(f) {
    if (f.value.password3 != this.pass) {
      alert("Bạn đã nhập sai mật khẩu!")
    } else {
      console.log(this.id);
      await this.delEmploy(this.id);
      alert("Xóa thành công!")
      this.modalService.dismissAll();
      this.calldata();
    }
  }
}
