import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Customer } from '../dataBean';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { resolve } from 'dns';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  constructor(
    private titleService: Title,
    private modelService: NgbModal,
    private sevice: ServicesService,
    private router: Router
  ) { }
  ngOnInit() {
    this.titleService.setTitle("Gear Shop - Quên mật khẩu");
  }
  openModel(model){
    this.modelService.open(model, {size: "sm"})
  }

  callData(form, model){
    this.openModel(model);
    this.sevice.getCustomer().subscribe(response => this.checkAccount(form, response))
  }
 checkAccount(dataForm, dataApi) {
    let acc = dataApi.find(item => item.username == dataForm.value.username && item.email == dataForm.value.email && item.phone == dataForm.value.phone);
    this.modelService.dismissAll();
    if (acc != null) {
      this.sevice.setSampleId(acc.id);
      this.router.navigate(["/repass"])
    } else {
      alert("Thông tin không chính xác !");
        }
  }
}
