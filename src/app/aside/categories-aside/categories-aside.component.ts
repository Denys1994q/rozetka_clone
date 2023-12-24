import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-categories-aside',
  templateUrl: './categories-aside.component.html',
  styleUrls: ['./categories-aside.component.sass']
})
export class CategoriesAsideComponent {
    @Input() categories!: any[]
    @Input() error!: boolean

    constructor(public modalService: ModalService, public authService: AuthService) {}

}