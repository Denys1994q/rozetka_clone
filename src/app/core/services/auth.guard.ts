import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ModalService } from 'src/app/modals/modal.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
    
    constructor(private authService: AuthService, private router: Router, private modalService: ModalService) {}

    ngOnInit() {
        this.authService.getUser().subscribe({
            next: resp => console.log(resp)
        })
    }

    canActivate(): any {
        if (this.authService.isAuthenticated()) {
            return of(true)
        } else {
            return this.authService.getUser().pipe(
                switchMap(resp => {
                    if (this.authService.isAuthenticated()) {
                        return [true]; // Користувач авторизований і має доступ до роуту
                    } else {
                        // Користувач не авторизований, перенаправляємо його на сторінку логіну
                        this.router.navigate(['/']); 
                        this.modalService.openDialog('login');
                        return [false]; 
                    }
                }),
                catchError(error => {
                    this.router.navigate(['/']); 
                    this.modalService.openDialog('login');
                    console.error('Помилка під час отримання даних користувача:', error);
                    return of(false);
                })
            )
        }


    }
}
