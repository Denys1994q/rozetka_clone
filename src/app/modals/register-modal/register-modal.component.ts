import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.sass']
})
export class RegisterModalComponent {
  constructor(private modalService: ModalService, private authService: AuthService) {}

  inputType = 'password'
  name = ''
  surname = ''
  phone = ''
  email = ''
  password: string = ''
  error: string = ''

  register (myForm: NgForm) {
    const user = {
      name: this.name,
      surname: this.surname,
      phone: this.phone,
      email: this.email,
      password: this.password
    }
    if (myForm.valid) {
      this.authService.register(user).subscribe({
        next: response => {
          this.modalService.closeDialog()
        },
        error: error => {
          if (error.error.message) {
            this.error = error.error.message
          } else {
            this.error = 'Щось пішло не так. Будь ласка, спробуйте пізніше'
          }
        }
      });
    } 
  }

  closeDialog() {
    this.modalService.closeDialog()
  }

  showPassword() {
    this.inputType = 'text'
  }

  hidePassword() {
    this.inputType = 'password'
  }

  openDialog() {
    this.modalService.closeDialog()
    this.modalService.openDialog('login')
  }
}
