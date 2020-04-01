import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showMenu() {
    (document.querySelector(".dropForBtn") as HTMLElement).style.opacity = "1";
    (document.querySelector(".dropForBtn") as HTMLElement).style.visibility =
      "visible";
  }
  hideMenu() {
    if ((document.querySelector(".dropForBtn") as HTMLElement).style.visibility == "visible") {
      (document.querySelector(".dropForBtn") as HTMLElement).style.opacity = "0";
      (document.querySelector(".dropForBtn") as HTMLElement).style.visibility =
        "hidden";
    }
  }
}
