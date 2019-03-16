import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {saveAs} from 'file-saver';
import {HttpService} from '../../service/http.service';
import {Secretary} from './secretary';
import {FileService} from '../../service/file.service';
import {User} from '../../home/user';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit, OnDestroy {
  secretaries: Array<Secretary> = [];
  flags: Array<string> = ['guidanceScore', 'ratingScore', 'replyScore'];
  timer: any;
  today: Date;
  texts: string; // 保存初始span里面的值
  total: string;
  @Input() user: User;

  constructor(private http: HttpService, private fileService: FileService) {
    this.timer = setInterval(() => {
      this.today = new Date();
    }, 50);
  }

  ngOnInit() {
    this.http.reply().subscribe((res: any) => {
      this.secretaries = res.extend.secretaries;
    }, (error: any) => {
      alert(error);
    });
  }

  check(data: any) {
    const total = Number(data);
    if (total < 60) {
      return '0';
    } else if (total >= 60 && total < 70) {
      return '1';
    } else if (total >= 70 && total < 80) {
      return '2';
    } else if (total >= 80 && total < 90) {
      return '3';
    }
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

  // 页面销毁时，清除时间
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
