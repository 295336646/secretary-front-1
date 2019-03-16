import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {HttpService} from '../../../service/http.service';
import {Student} from './student';
import * as $ from 'jquery';
import {Teacher} from '../teacher/teacher';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  modalRef: BsModalRef;
  config: any = {
    animated: true,
    backdrop: 'static',
    keyboard: false
  };
  students: Array<Student>;
  checkStudents: Array<Student> = new Array<Student>();
  @Output() outer = new EventEmitter();

  constructor(private modalService: BsModalService, private http: HttpService) {
  }

  ngOnInit() {
    this.http.showStudents().subscribe((res: any) => {
      this.students = res;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  decline(): void {
    this.modalRef.hide();
  }

  confirm(e: any): void {
    this.checkStudents.length = 0;
    for (let i = 0; i < $('.check_item:checked').length; i++) {
      const student = new Student();
      student.sid = $('.check_item:checked').eq(i).attr('id');
      student.sname = $('.check_item:checked').eq(i).attr('name');
      this.checkStudents.push(student);
    }
    this.outer.emit(this.checkStudents);
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

  remove(checkStudent: Student) {
    this.checkStudents = this.checkStudents.filter((student: Student) => {
        return student !== checkStudent;
      }
    );
  }
}
