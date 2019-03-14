import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  list: Array<any>;
  groups: Array<number> = [1, 2, 3, 4, 5, 6];

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.groupAll().subscribe((result: any) => {
      this.list = result;
    });
  }

}
