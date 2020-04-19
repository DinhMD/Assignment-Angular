import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

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
  search(form) {
    if (form.value.textSearch != "") {
      this.router.navigate(["home/search/" + form.value.textSearch]);
    }

  }
}
