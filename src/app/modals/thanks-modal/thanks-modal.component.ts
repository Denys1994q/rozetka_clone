import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-thanks-modal',
  templateUrl: './thanks-modal.component.html',
  styleUrls: ['./thanks-modal.component.sass']
})
export class ThanksModalComponent {

    constructor(public modalService: ModalService) {}

}