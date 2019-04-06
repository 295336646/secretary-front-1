import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {saveAs} from 'file-saver';
import {HttpService} from '../../service/http.service';
import {FileService} from '../../service/file.service';
import {User} from '../../home/user';
import {PageInfo} from './PageInfo';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit, OnDestroy {
  @ViewChild('reply') rep: any;
  pageInfo: PageInfo = new PageInfo();
  timer: any;
  today: Date;
  texts: string; // 保存初始span里面的值
  total: string;
  review: string;
  data: any;
  down = 'http://localhost:8080/cl/';
  downAddress: Array<string> = ['downWordSheet?', 'downWordReview?'];
  @Input() user: User;

  constructor(private http: HttpService, private fileService: FileService) {
    this.pageInfo.firstPage = '1';
    this.timer = setInterval(() => {
      this.today = new Date();
    }, 50);
  }

  ngOnInit() {
    const params = new HttpParams().set('pn', this.pageInfo.firstPage);
    this.getReview(params);
  }

  getReview(params: HttpParams) {
    this.http.reply(params).subscribe((result: any) => {
      this.pageInfo.students = result.extend.pageInfo.list;
      this.pageInfo.pageNum = result.extend.pageInfo.pageNum;
      this.pageInfo.pages = result.extend.pageInfo.pages;
      this.pageInfo.total = result.extend.pageInfo.total;
      this.pageInfo.lastPage = result.extend.pageInfo.total;
      this.pageInfo.hasPreviousPage = result.extend.pageInfo.hasPreviousPage;
      this.pageInfo.hasNextPage = result.extend.pageInfo.hasNextPage;
      this.pageInfo.navigatepageNums = result.extend.pageInfo.navigatepageNums;
    }, (error: any) => {
      alert(error);
    });
  }

  getPage(page_Num: string) {
    const params = new HttpParams().set('pn', page_Num);
    this.getReview(params);
    return false;
  }

  getFirstPage() {
    const params = new HttpParams().set('pn', this.pageInfo.firstPage);
    this.getReview(params);
    return false;
  }

  getPreviousPage() {
    const params = new HttpParams().set('pn', (this.pageInfo.pageNum - 1).toString());
    this.getReview(params);
    return false;
  }

  getNextPage() {
    const params = new HttpParams().set('pn', (this.pageInfo.pageNum + 1).toString());
    this.getReview(params);
    return false;
  }

  getLastPage() {
    const params = new HttpParams().set('pn', this.pageInfo.lastPage);
    this.getReview(params);
    return false;
  }

  // 核对总评
  check(data: any) {
    const total = Number(data);
    if (total < 60) {
      this.review = '不及格';
    } else if (total >= 60 && total < 70) {
      this.review = '及格';
    } else if (total >= 70 && total < 80) {
      this.review = '中等';
    } else if (total >= 80 && total < 90) {
      this.review = '良好';
    } else {
      this.review = '优秀';
    }
    return true;
  }

  // 修改表中数据
  edit(e: any) {
    const span = e.target;
    const input = e.target.nextSibling;
    const spanTotal = e.target.parentNode.parentNode.nextSibling.firstChild;
    // 根据表格文本创建文本框 并加入表表中--文本框的样式自己调整
    this.texts = span.innerText;
    this.total = spanTotal.innerText;
    input.value = this.texts;
    span.innerText = '';
    input.style.display = 'block';
    $(input).focus();
  }

  // 修改评分成绩
  inputEdit(e: any, data: any, id: string) {
    const input = e.target;
    const span = e.target.parentNode.firstChild;
    const spanTotal = e.target.parentNode.parentNode.nextSibling.firstChild;
    const newText = input.value;
    const pattern = /^\d{1,3}$/;
    // 只能是1-3位数字，且数字范围必须是0-100
    if (!pattern.test(newText) || newText < 0 || newText > 100 || newText === '') {
      alert('数据非法');
      return;
    }
    if (confirm('确定要修改吗？')) {
      this.http.updateReply(id, data).subscribe((res: any) => {
        if (res === true) {
          // 移除文本框,显示新值
          input.style.display = 'none';
          span.innerText = newText;
        }
      }, (error: any) => {
        alert(error);
      });
    } else {
      // 移除文本框,不保存修改
      input.style.display = 'none';
      spanTotal.innerText = this.total;
      span.innerText = this.texts;
    }
  }

  // 导出表格
  exportTable() {
    // 将导出的部分用html包裹，并设置编码格式，以解决导出内容乱码问题
    const data = `<html><head><meta charset='utf-8' /></head><body>` + $('#table')[0].outerHTML + `</body></html>`;
    // 设置文件导出类型未excel
    const blob = new Blob([data], {
      type: 'application/ms-excel'
    });
    const fd = new FormData();
    fd.append('file', blob, '学生成绩表.xls');  // fileData为自定义
    // 上传blob文件
    this.fileService.upload(this.user.uid, fd).subscribe((res: any) => {
      alert('文件成功导入数据库');
      console.log(res);
    });
    // saveAs(blob, '学生成绩表.xls');
  }

  downWordSheet(secretary: any) {
    // if (localStorage.getItem(secretary.sid)) {
    //   this.reply = JSON.parse(localStorage.getItem(secretary.sid));
    // }
    if (!this.rep.reply.task || !this.rep.reply.technology ||
      !this.rep.reply.language || !this.rep.reply.answer || !this.rep.reply.comments) {
      this.rep.reply.task = secretary.grade.task;
      this.rep.reply.technology = secretary.grade.technology;
      this.rep.reply.language = secretary.grade.language;
      this.rep.reply.answer = secretary.grade.answer;
      this.rep.reply.comments = secretary.grade.comments;
    }
    const sid = secretary.sid;
    const sname = secretary.sname;
    const cname = secretary.course.cname;
    const replyGrade = secretary.grade.replyGrade;
    this.data = `sid=${sid}&sname=${sname}&cname=${cname}
     &task=${this.rep.reply.task}&technology=${this.rep.reply.technology}
    &language=${this.rep.reply.language}&answer=${this.rep.reply.answer}&replyGrade=${replyGrade}
   &comments=${this.rep.reply.comments}`;
  }

  downWordReview(secretary: any, review: any) {
    const sid = secretary.sid;
    const sname = secretary.sname;
    const cname = secretary.course.cname;
    const advisorGrade = secretary.grade.advisorGrade;
    const reviewGrade = secretary.grade.reviewGrade;
    const replyGrade = secretary.grade.replyGrade;
    const total = (secretary.grade.advisorGrade * 0.4 + secretary.grade.reviewGrade * 0.2 + secretary.grade.replyGrade * 0.4)
      .toFixed(0);
    this.data = `sid=${sid}&sname=${sname}&cname=${cname}
    &advisorGrade=${advisorGrade}&reviewGrade=${reviewGrade}
    &replyGrade=${replyGrade}&total=${total}&review=${this.review}`;
  }

  // 页面销毁时，清除时间
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
