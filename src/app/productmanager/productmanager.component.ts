import { Component, OnInit } from '@angular/core';
import { Products } from '../dataBean'
import { ServicesService } from '../services.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-productmanager',
  templateUrl: './productmanager.component.html',
  styleUrls: ['./productmanager.component.scss']
})

export class ProductmanagerComponent implements OnInit {
  constructor(private titleService : Title) { }
  ngOnInit(): void {
    this.titleService.setTitle("Gear Shop - Manager Center");
  }
  showToggle(){
    (document.querySelector(".homeSubmenu") as HTMLElement).style.height = "0";
  }
}
