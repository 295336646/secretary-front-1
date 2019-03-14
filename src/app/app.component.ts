import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // products: Product[];

  constructor() {
    // this.products = [
    //   new Product('cl'),
    //   new Product('pb'),
    //   new Product('db'),
    //   new Product('春辉')
    // ];
  }

  ngOnInit(): void {
  }
}
//
// export class Product {
//   constructor(name: string) {
//     this.name = name;
//   }
//
//   name: string;
// }
