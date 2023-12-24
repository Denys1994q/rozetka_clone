import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ICategory } from 'src/app/categories/models/categories.model';

@Component({
  selector: 'app-categories-aside',
  templateUrl: './categories-aside.component.html',
  styleUrls: ['./categories-aside.component.sass']
})
export class CategoriesAsideComponent {
    @Input() categories!: ICategory[]
    @Input() error!: boolean

    constructor(public modalService: ModalService, public authService: AuthService) {}

}