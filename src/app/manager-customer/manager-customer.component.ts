import { Component, OnInit } from '@angular/core';
import { Customer } from '../dataBean';
import { ServicesService } from '../services.service';
import { error } from 'protractor';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngbd-modal-content',
  styles: [`
    .dark-modal .modal-content {
      background-color: rgba(#292b2c, 0);
    }
  `],
  template: `
  <button class="btn btn-warning w-100">
      <span class="spinner-border spinner-border-sm"></span>
      Vui lòng đợi lấy dữ liệu..
  </button>
  `
})
export class modalLoadCustomer {
  constructor(
    public activeModal: NgbActiveModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
}
@Component({
  selector: 'app-manager-customer',
  templateUrl: './manager-customer.component.html',
  styleUrls: ['./manager-customer.component.scss']
})
export class ManagerCustomerComponent implements OnInit {

  constructor(private service: ServicesService, private modalservice : NgbModal) { }
  customer: Customer[];
  ngOnInit(): void {
    this.calldata();
  }
  openModal(content) {
    this.modalservice.open(content, {centered: false, size: 'sm'});
  }
  calldata(){
    this.openModal(modalLoadCustomer);
    this.service.getCustomer().subscribe(respones => this.closeModal(respones));
  }
  closeModal(data) {
    this.customer = data;
    this.modalservice.dismissAll();
  }
}
