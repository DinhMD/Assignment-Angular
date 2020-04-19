import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Products } from '../dataBean';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  listPage: Products[];
  listItem: Products[];
  page = 1;
  indexPage = 0;
  maxpage;
  constructor(
    private service : ServicesService,
    private active: ActivatedRoute,
    private title : Title
  ) { }
  textSearch = "";
  ngOnInit(): void {
    this.active.params.subscribe(param => this.search(param.text));
  }
  search(text) {
    this.textSearch = text;
    this.service.getProduct().subscribe(responese => this.setList(responese, text));
  }
  setList(list, text) {
    let texttype;
    this.title.setTitle(text + " - Kết quả tìm kiếm");
    switch (text.toLowerCase()) {
        case 'tai nghe': {texttype = "hea"; break; }
        case 'màn hình': {texttype = "dis"; break; }
        case 'chuột': {texttype = "mou"; break; }
        case 'bàn phím': {texttype = "key"; break; }
        case 'ghế': {texttype = "cha"; break; }
    }
    this.listItem = list.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1 || item.type.toLowerCase().indexOf(texttype) > -1 || item.price.toString() == text || item.sale.toString() == text);
    this.listPage = this.listItem;
    this.maxpage = Math.ceil(this.listItem.length/12)*10;
    this.showPage();
  }
  showPage(){
    let index = 0;
    if (this.listItem.length > 12) {
    for (var i = 1; i < this.page; i++) {
      index += 12;
    }
    this.indexPage = this.page;
    this.listPage = this.listItem.slice(index,index+12);
  }
  }
}
