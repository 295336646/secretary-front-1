import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {User} from '../../../home/user';
import {HttpService} from '../../../service/http.service';
import {Grade} from '../grade';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-reply-grade-modal',
  templateUrl: './reply-grade-modal.component.html',
  styleUrls: ['./reply-grade-modal.component.scss']
})
export class ReplyGradeModalComponent implements OnInit {
  @Input() secretary: any;
  @Input() total;
  modalRef: BsModalRef;
  config: any = {
    animated: true,
    backdrop: 'static',
    keyboard: false
  };
  reply: any = {
    task: '',
    technology: '',
    language: '',
    answer: '',
    comments: ''
  };
  grade: Grade = new Grade();

  constructor(private modalService: BsModalService, private http: HttpService) {
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    const params = new HttpParams().set('sid', this.secretary.sid);
    this.http.getGrade(params).subscribe((res: any) => {
      this.reply = res;
    }, (error: any) => {
      alert(error);
    }, () => {
      this.modalRef = this.modalService.show(template, this.config);
    });
  }

  decline(): void {
    this.modalRef.hide();
  }

  calculate() {
    if (this.reply.task && this.reply.technology && this.reply.language && this.reply.answer) {
      this.secretary.grade.replyGrade =
        (this.reply.task * 1 + this.reply.technology * 1 + this.reply.language * 1 + this.reply.answer * 1).toFixed(0);
    }
  }

  submit() {
    this.grade.replyGrade = this.secretary.grade.replyGrade;
    this.grade.totalGrade = this.total;
    this.grade.generalComments = this.check(this.grade.totalGrade);

    this.grade.task = this.reply.task;
    this.grade.technology = this.reply.technology;
    this.grade.language = this.reply.language;
    this.grade.answer = this.reply.answer;
    this.grade.comments = this.reply.comments;
    if (!this.reply.task || !this.reply.technology || !this.reply.language || !this.reply.answer || !this.reply.comments) {
      alert('请填满!!!');
      return;
    }
    this.http.updateGrade(this.grade, this.secretary.sid).subscribe((res: any) => {
      if (res === true) {
        alert('修改成功');
      }
    }, (error: any) => {
      alert(error);
    }, () => {
      this.modalRef.hide();
    });
  }

  check(totalGrade: number) {
    const total = Number(totalGrade);
    if (total < 60) {
      return '不及格';
    } else if (total >= 60 && total < 70) {
      return '及格';
    } else if (total >= 70 && total < 80) {
      return '中等';
    } else if (total >= 80 && total < 90) {
      return '良好';
    } else {
      return '优秀';
    }
  }
}
