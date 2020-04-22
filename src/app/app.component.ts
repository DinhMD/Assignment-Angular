import { Component, OnInit } from "@angular/core";
import { Title } from '@angular/platform-browser';
import { ServicesService } from './services.service';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = ""
  constructor(private titleService: Title, private service : ServicesService) { }
  ngOnInit(): void {
    this.titleService.setTitle("Gear Shop - Gaming Gear Center");
    // this.service.setLogin(false);
  }
}
