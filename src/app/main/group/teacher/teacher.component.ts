import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import * as $ from 'jquery';
import {HttpService} from '../../../service/http.service';
import {Teacher} from './teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  modalRef: BsModalRef;
  config: any = {
    animated: true,
    backdrop: 'static',
    keyboard: false
  };
  @Input() teacherFlag: string;
  teachers: Array<Teacher>;
  // tname: Array<string> = new Array<string>();
  // tid: Array<string> = new Array<string>();
  checkTeachers: Array<Teacher> = new Array<Teacher>();
  teacher: Teacher;

  constructor(private modalService: BsModalService, private http: HttpService) {
  }

  ngOnInit() {
    this.http.showTeachers().subscribe((res: any) => {
      this.teachers = res;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  decline(): void {
    this.modalRef.hide();
  }

  confirm(e: any): void {
    this.checkTeachers.length = 0;
    for (let i = 0; i < $('.check_item:checked').length; i++) {
      this.teacher = new Teacher();
      this.teacher.tid = $('.check_item:checked').eq(i).attr('id');
      this.teacher.tname = $('.check_item:checked').eq(i).attr('name');
      this.checkTeachers.push(this.teacher);
    }
    this.decline();
  }

  checkAll() {
    $('.check_item').prop('checked', $('#check_all').prop('checked'));
  }

  checkItem(e: any) {
    e.stopPropagation();
    const flag = $('.check_item:checked').length === $('.check_item').length;
    $('#check_all').prop('checked', flag);
  }

  checkLine(e: any) {
    e.target.parentNode.firstChild.firstChild.checked = !e.target.parentNode.firstChild.firstChild.checked;
  }

  remove(checkTeacher: Teacher) {
    // filter方法返回数组
    this.checkTeachers = this.checkTeachers.filter((teacher: Teacher) => {
        return teacher !== checkTeacher;
      }
    );
  }
}
