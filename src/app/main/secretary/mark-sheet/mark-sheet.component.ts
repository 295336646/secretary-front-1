import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {saveAs} from 'file-saver';
import * as $ from 'jquery';

@Component({
  selector: 'app-mark-sheet',
  templateUrl: './mark-sheet.component.html',
  styleUrls: ['./mark-sheet.component.scss']
})
export class MarkSheetComponent implements OnInit {
  modalRef: BsModalRef;
  config: any = {
    animated: true,
    class: 'gray modal-lg'
  };
  @Input() secretary: any;
  reply = {
    task: '',
    technology: '',
    language: '',
    answer: '',
  };

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    if (localStorage.getItem(this.secretary.sid)) {
      this.reply = JSON.parse(localStorage.getItem(this.secretary.sid));
    }
    this.modalRef = this.modalService.show(template, this.config);
  }

  decline(): void {
    this.modalRef.hide();
  }

  // 导出
  export() {
    // 将导出的部分用html包裹，并设置编码格式，以解决导出内容乱码问题
    // console.log($('.modal-body')[0].outerHTML);
    const data = `<html>
                      <head><meta charset='utf-8'/></head>
                       <body>` + $('.modal-body')[0].outerHTML + `</body>
                   </html>`;
    // 设置文件导出类型未excel
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    saveAs(blob, `${this.secretary.sname}_${this.secretary.sid}_毕业设计（论文）评阅人评分表.docx`);
  }
}
