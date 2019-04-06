import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-secretary-modal',
  templateUrl: './secretary-modal.component.html',
  styleUrls: ['./secretary-modal.component.scss']
})
export class SecretaryModalComponent implements OnInit {
  @Input() secretary: any;
  modalRef: BsModalRef;
  config: any = {
    animated: true,
    backdrop: 'static',
    keyboard: false
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
}
