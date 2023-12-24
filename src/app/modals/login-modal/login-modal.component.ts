import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.sass']
})
export class LoginModalComponent {
    inputType = 'password'
    emailPhone = ''
    password: any = ''
    error: string = ''

    constructor(private modalService: ModalService, public authService: AuthService, private http: HttpClient) {}

    login (myForm: NgForm) {
        if (myForm.valid) {
        this.authService.login({emailPhone: this.emailPhone, password: this.password}).subscribe({
            next: response => this.modalService.closeDialog(),
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

    authWindow!: any
    loginWithGmail() {
        if (typeof window !== 'undefined') {
            const width = 600;
            const height = 500;
            const right = window.innerWidth - width;
            const top = 0;
            const windowFeatures = `width=${width},height=${height},right=${right},top=${top}`;
            this.authWindow = window.open('https://evergreen-purrfect-agenda.glitch.me/auth/google', '_blank', windowFeatures);
        }
    }

    ngOnInit() {
        if (typeof window !== 'undefined') {
            // Очікуємо подію message від вікна авторизації
            window.addEventListener('message', (event) => {
                if (event.origin === 'https://evergreen-purrfect-agenda.glitch.me') {
                    // Перевіряємо, чи повідомлення вказує на успішну авторизацію
                    if (event.data === 'authSuccess') {
                        this.authWindow.close()
                        this.modalService.closeDialog()
                        if (this.authWindow) {
                            this.authService.getUser().subscribe({
                            next: () => {},
                            error: err => console.log(err)
                            })
                        }
                    }
                }
            });
        }
    }

    loginWithFb() {
        if (typeof window !== 'undefined') {
            window.open('https://evergreen-purrfect-agenda.glitch.me/auth/facebook', '_self');
        }
    }

    openRegisterDialog() {
        this.modalService.closeDialog()
        this.modalService.openDialog('register')
    }

    showPassword() {
        this.inputType = 'text'
    }

    hidePassword() {
        this.inputType = 'password'
    }
 }
