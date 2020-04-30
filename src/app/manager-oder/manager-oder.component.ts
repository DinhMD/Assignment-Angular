import { Component, OnInit } from "@angular/core";
import { Order, Customer } from '../dataBean';
import { ServicesService } from "../services.service";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { ActivatedRoute } from "@angular/router";
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
export class modalLoadOrder {
  constructor(
    public activeModal: NgbActiveModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
}
@Component({
  selector: "app-manager-oder",
  templateUrl: "./manager-oder.component.html",
  styleUrls: ["./manager-oder.component.scss"]
})
export class ManagerOderComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private activate: ActivatedRoute,
    private modalService: NgbModal
  ) { }
  orderlist: Order[];
  customer: Customer[];
  ngOnInit(): void {
    this.orderlist = [];
    this.callData();
  }
  openModal(content){
    this.modalService.open(content, {centered:false, size:'sm'});
  }
  callData(){
    this.openModal(modalLoadOrder);
    this.service.getCustomer().subscribe(data => this.getAllOrder(data));
  }
  getAllOrder(data) {
    this.customer = data;
    for (var i = 0; i < data.length; i++) {
      this.service.getFullCartActive(data[i].id).subscribe(data => (this.orderlist =  this.orderlist.concat(data)));
    }
    this.modalService.dismissAll();
  }
}
