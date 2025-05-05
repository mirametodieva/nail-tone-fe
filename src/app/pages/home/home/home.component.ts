import {Component, OnInit} from '@angular/core';
import {BeautySalonService} from "../../../services/beauty-salon.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly beautySalonService: BeautySalonService) {
  }

  ngOnInit() {

  }

}
