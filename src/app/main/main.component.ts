import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @HostListener('window:scroll')
  setScroll(){
    if ( document.documentElement.scrollTop > 100) {
      (document.querySelector("#btntoTop") as HTMLElement).style.display = "block";
    } else  {
      (document.querySelector("#btntoTop") as HTMLElement).style.display = "none";
    }
  }
  goTop(){
    window.scrollTo(0,0);
  }
}
