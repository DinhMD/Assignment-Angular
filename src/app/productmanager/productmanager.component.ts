import { Component, OnInit } from '@angular/core';
import { Products } from '../products'
import { ServicesService } from '../services.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@Component({
  selector: 'app-productmanager',
  templateUrl: './productmanager.component.html',
  styleUrls: ['./productmanager.component.scss']
})
export class ProductmanagerComponent implements OnInit {
  litsItem : Products[];
  constructor(private service:ServicesService) { }

  ngOnInit(): void {
    this.litsItem = this.service.getProduct();
  }
}
