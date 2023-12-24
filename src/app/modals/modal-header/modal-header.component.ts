import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.sass']
})
export class ModalHeaderComponent {
    @Input() title!: string

    constructor(private modalService: ModalService) {}

    closeDialog() {
        this.modalService.closeDialog()
    }

}
