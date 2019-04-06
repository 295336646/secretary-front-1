import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
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
  @Output() outer = new EventEmitter();
  teachers: Array<Teacher>;
  checkTeacher: Teacher;

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
    this.checkTeacher = new Teacher();
    this.checkTeacher.tid = $(`input[name='teacher']:checked`).attr('id');
    this.checkTeacher.tname = $(`input[name='teacher']:checked`).attr('class');
    this.outer.emit(this.checkTeacher);
    this.decline();
  }

  checkLine(e: any) {
    e.target.parentNode.firstChild.firstChild.checked = !e.target.parentNode.firstChild.firstChild.checked;
  }

  remove() {
    this.checkTeacher = null;
  }
}
