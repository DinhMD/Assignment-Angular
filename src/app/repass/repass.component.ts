import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../dataBean';
import { resolve } from 'dns';
import { async } from 'rxjs/internal/scheduler/async';
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
      Please wait..
  </button>
  `
})
export class modalLoad {
  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-repass',
  templateUrl: './repass.component.html',
  styleUrls: ['./repass.component.scss']
})
export class RepassComponent implements OnInit {

  constructor(
    private service: ServicesService,
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private router: Router
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  customer: Customer;
  customerName = "";
  ngOnInit(): void {
    this.modalService.open(modalLoad, { size: "sm" });
    this.call();
  }
  call() {
    let id = this.service.getSampleId();
    if (id != null) {
      this.getCustomer(id);
    } else {
      this.modalService.dismissAll();
      this.router.navigate(["/404"]);
    }
  }
  getCustomer(id) {
    this.service.getCustomerByID(id).subscribe(response => this.setName(response));
  }
  setName(customer) {
    this.modalService.dismissAll()
    this.customer = customer
    this.customerName = customer.name
  }
  updateCustomerPass(customer) {
    return new Promise(resolve => {
      this.service.updateCustomerByID(customer).subscribe(data => resolve(data));
    })
  }
  async callData(form, model) {
    this.modalService.open(model, { size: "sm" })
    let customer = { id: this.customer.id, password: form.value.password };
    let ac = await this.updateCustomerPass(customer);
    this.modalService.dismissAll();
    if (ac != null) {
      this.router.navigate(["/login"])
    } else {
      alert("Unsuccessful! Try to change your password again!")
    }

  }
  checkp: boolean = true;
  checkPass(pa, rpa) {
    if (pa == rpa) {
      this.checkp = true;
    } else {
      this.checkp = false;
    }
  }
}
