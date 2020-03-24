import { Injectable } from '@angular/core';
import { datafake } from './datafake';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  fullitems = datafake;
  constructor() { }
  getProduct(){
    return this.fullitems;
  }
}
