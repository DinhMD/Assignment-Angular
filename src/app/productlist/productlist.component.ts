import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../services.service";
import { Products } from "../dataBean";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
registerLocaleData(localeFr, "fr");
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
export class modalHome {
  constructor(public activeModal: NgbActiveModal) { }
}
@Component({
  selector: "app-productlist",
  templateUrl: "./productlist.component.html",
  styleUrls: ["./productlist.component.scss"]
})
export class ProductlistComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  display: Products[];
  chair: Products[];
  keyboard: Products[];
  headphone: Products[];
  mouse: Products[];
  product: Products[];
  product2: Products[];
  ngOnInit(): void {
    this.openVerticallyCentered(modalHome);
    this.service
      .getProduct()
      .subscribe(
        response => this.pullProduct(response),
        error => console.log(error)
      );
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { size: 'sm' });
  }
  pullProduct(list) {
    this.product = list;
    this.display = this.product.filter(item => item.type === "DIS");
    this.chair = this.product.filter(item => item.type === "CHA");
    this.headphone = this.product.filter(item => item.type === "HEA");
    this.mouse = this.product.filter(item => item.type === "MOU");
    this.keyboard = this.product.filter(item => item.type === "KEY");
    this.config.keyboard = true;
    this.modalService.dismissAll();
  }
  onLinkClick(id) {
    document.getElementById(id).scrollIntoView();
  }
  produc: Products;
  showPro(item) {
    this.produc = item;
  }
}
