import { Component, OnInit } from '@angular/core';
import { Employ } from '../dataBean';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-manager-employ',
  templateUrl: './manager-employ.component.html',
  styleUrls: ['./manager-employ.component.scss']
})
export class ManagerEmployComponent implements OnInit {

  constructor(private service: ServicesService) { }
  employ: Employ[];
  ngOnInit(): void {
    this.service.getEmploy().subscribe(response => (this.employ = response), errors => console.log(errors));
  }
}
