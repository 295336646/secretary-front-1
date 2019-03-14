import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  states: Array<string>;

  constructor() {
    this.states = ['登录', '注册'];
  }

  ngOnInit() {
  }

}
