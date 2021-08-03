import { Component, OnInit } from '@angular/core';
import {CityService} from "../../../share/services/city.service";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
