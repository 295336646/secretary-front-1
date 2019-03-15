import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  list: Array<any>;
  groups: Array<number> = [1, 2, 3, 4, 5, 6];
  teacherFlag = true;
  @ViewChild('teacher') teacher: any;
  @ViewChild('student') student: any;
  @ViewChild('judge') judge: any;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.groupAll().subscribe((result: any) => {
      this.list = result;
    });
  }

  submit() {
    console.log(this.teacher.checkTeachers);
    console.log(this.student.checkStudents);
    console.log(this.judge.checkTeachers);
  }
}
