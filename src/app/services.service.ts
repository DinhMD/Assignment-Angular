import { Injectable } from '@angular/core';
import { datafake } from './datafake';
import { orderdata } from './datafake';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  fullitems = datafake;
  fullOrder = orderdata;
  constructor() { }
  getProduct(){
    return this.fullitems;
  }
  getOrder(){
    return this.fullOrder;
  }
}
