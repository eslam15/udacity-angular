import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent {
  @ViewChild('alertModal') alertModal: TemplateRef<any> = {} as TemplateRef<any>;
  @Input() bodyText: string = '';
  @Input() headerText: string = '';
  modalRef?: BsModalRef;
  config = {
    keyboard: true
  };

  constructor(private modalService: BsModalService) { }

  showModal() {
    this.modalRef = this.modalService.show(this.alertModal, this.config);
  }

}
