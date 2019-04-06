import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import * as $ from 'jquery';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-mark-review',
  templateUrl: './mark-review.component.html',
  styleUrls: ['./mark-review.component.scss']
})
export class MarkReviewComponent implements OnInit {
  @Input() secretary: any;
  modalRef: BsModalRef;
  config: any = {
    animated: true,
    class: 'gray modal-lg'
  };

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  decline(): void {
    this.modalRef.hide();
  }

  // 核对总评
  check(data: any) {
    const total = Number(data);
    if (total < 60) {
      return 0;
    } else if (total >= 60 && total < 70) {
      return 1;
    } else if (total >= 70 && total < 80) {
      return 2;
    } else if (total >= 80 && total < 90) {
      return 3;
    }
  }

  // 导出
  export() {
    // 将导出的部分用html包裹，并设置编码格式，以解决导出内容乱码问题
    const data = `<html>
                      <head><meta charset='utf-8'/></head>
                       <body>` + $('.modal-body')[0].outerHTML + `</body>
                   </html>`;
    // 设置文件导出类型未excel
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    saveAs(blob, `${this.secretary.sname}_${this.secretary.sid}_毕业设计（论文）答辩评议书.docx`);
  }
}
