import { Component } from '@angular/core';
import { ModalService } from 'src/app/shared/components/modal/modal.service';

@Component({
  selector: 'app-services-modal',
  templateUrl: './services-modal.component.html',
  styleUrls: ['./services-modal.component.sass']
})
export class ServicesModalComponent {
  constructor(private modalService: ModalService) {}
  closeDialog() {
    this.modalService.closeDialog()
  }
}
