import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {Student} from './student/student';
import {TeacherComponent} from './teacher/teacher.component';
import {StudentComponent} from './student/student.component';
import {Teacher} from './teacher/teacher';
import {Alert} from 'selenium-webdriver';
import * as $ from 'jquery';
import {FileService} from '../../service/file.service';
import {User} from '../../home/user';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  list: Array<any>;
  groups: Array<number> = new Array<number>();
  checkTeacher: Teacher;
  checkStudents: Array<Student> = new Array<Student>();
  flag = false;
  @Input() user: User;

  constructor(private httpService: HttpService, private fileService: FileService) {
  }

  ngOnInit() {
    this.groupAll();
    if (localStorage.getItem('groups') !== null) {
      this.groups = JSON.parse(localStorage.getItem('groups'));
    }
  }

  getCheckTeacher(e: any) {
    this.checkTeacher = e;
  }

  getCheckStudents(e: any) {
    this.checkStudents = e;
  }

  groupAll() {
    this.httpService.groupAll().subscribe((result: any) => {
      this.list = result;
    });
  }

  submit(group: string) {
    if (this.checkStudents.length === 0 || this.checkTeacher == null) {
      alert('不能提交空数据');
      return;
    }
    for (let i = 0; i < this.checkStudents.length; i++) {
      this.httpService.dividedGroup(this.checkStudents[i].sid, group, this.checkTeacher.tid).subscribe((res: any) => {
          this.flag = res;
          if (this.flag === false) {
            alert('不能和指导教师分为一组');
            return;
          } else {
            alert('分组成功');
          }
        },
        () => {
        }, () => {
        }
      );
    }
    // this.checkStudents.forEach((student: Student) => {
    //   this.httpService.dividedGroup(student.sid, group, this.checkTeacher.tid).subscribe((res: any) => {
    //     this.flag = res;
    //   });
    // });
    this.groupAll();
  }

  addGroup() {
    if (this.groups.length === 0) {
      this.groups.push(1);
    } else {
      this.groups.push(this.groups[this.groups.length - 1] + 1);
    }
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  romoveGroup(i: any) {
    this.groups.splice(i, 1);
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  // 导出表格
  exportTable() {
    // 将导出的部分用html包裹，并设置编码格式，以解决导出内容乱码问题
    const data = `<html><head><meta charset='utf-8' /></head><body>` + $('#group')[0].outerHTML + `</body></html>`;
    // 设置文件导出类型未excel
    const blob = new Blob([data], {
      type: 'application/ms-excel'
    });
    const fd = new FormData();
    fd.append('file', blob, '分组表.xls');  // fileData为自定义
    // 上传blob文件
    this.fileService.upload(this.user.uid, fd).subscribe((res: any) => {
      alert('文件成功导入数据库');
      console.log(res);
    });
    // saveAs(blob, '学生成绩表.xls');
  }
}
