import { Component, OnInit } from '@angular/core';
import { Products } from "../dataBean";
import { ServicesService } from '../services.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {

  constructor(
    private service: ServicesService,
    private active: ActivatedRoute
    ) { }
    listItem: Products[];
    listPage: Products[];
    typeParam;
    typeName;
    typeDesc;
    page;
    index;
    indexPage = 1;
    maxpage;
  ngOnInit(): void {
    this.index = 0;
    this.page = 1;
    this.active.params.subscribe(param => this.setProductType(param.type));
  }
  showPage(){
    if (this.listItem.length > 12) {
    if (this.page > this.indexPage) {
        this.index = this.index + 12;
    } else {
      this.index = this.index - 12;
    }
    this.indexPage = this.page;
    this.listPage = this.listItem.slice(this.index,this.index+12);
  }
  }
  setProductType(type){
    this.typeParam = type;
    switch(type) {
      case "DIS": {this.typeName = "Màn hình";this.typeDesc="Màn hình chính hãng chất lượng tuyệt đối, hỗ trợ trả góp 0%"; break;}
      case "CHA": {this.typeName = "Ghế";this.typeDesc="Ghế gaming đáp ứng mọi nhu cầu, khuyến mãi cho sinh viên"; break;}
      case "KEY": {this.typeName = "Bàn phím";this.typeDesc="Bàn phím cơ hàng đầu cho mọi đối tượng"; break;}
      case "HEA": {this.typeName = "Tai nghe";this.typeDesc="Tai nghe cao cấp cho game thủ"; break;}
      case "MOU": {this.typeName = "Chuột";this.typeDesc="Chuột gaming chính hãng bảo hành 24 tháng"; break;}
    }
    this.service.getProduct().subscribe(responese => this.loadProduct(responese, type), error => console.log(error));
  }
  loadProduct(list, type){
    this.listItem = list.filter(item => item.type == type);
    this.listPage = this.listItem.slice(0,12);
    this.maxpage = Math.ceil(this.listItem.length/12)*10;
  }
}
