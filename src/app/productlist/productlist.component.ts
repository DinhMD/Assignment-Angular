import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Products } from '../products';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  constructor(private service : ServicesService) { }
  display:Products[];
  chair:Products[];
  keyboard:Products[];
  headphone:Products[];
  mouse:Products[];
  product : Products[];
  ngOnInit(): void {
    this.product = this.service.getProduct();
    this.display = this.product.filter(product => product.type =='DIS')
    this.chair = this.product.filter(product => product.type =='CHA')
    this.headphone = this.product.filter(product => product.type =='HEA')
    this.mouse = this.product.filter(product => product.type =='MOU')
    this.keyboard = this.product.filter(product => product.type =='KEY')
  }

}
