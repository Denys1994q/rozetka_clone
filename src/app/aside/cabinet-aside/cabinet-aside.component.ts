import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-cabinet-aside',
  templateUrl: './cabinet-aside.component.html',
  styleUrls: ['./cabinet-aside.component.sass']
})
export class CabinetAsideComponent {

    constructor(public authService: AuthService) {}

}