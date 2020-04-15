import { Component, OnInit } from '@angular/core';
import { Customer } from '../dataBean';
import { ServicesService } from '../services.service';
import { error } from 'protractor';
@Component({
  selector: 'app-manager-customer',
  templateUrl: './manager-customer.component.html',
  styleUrls: ['./manager-customer.component.scss']
})
export class ManagerCustomerComponent implements OnInit {

  constructor(private service: ServicesService) { }
  customer: Customer[];
  ngOnInit(): void {
    this.service.getCustomer().subscribe(respones => (this.customer = respones), error => console.log(error));
  }

}
