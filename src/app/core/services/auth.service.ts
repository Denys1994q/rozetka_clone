import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/cabinet/services/wishlist.service';

interface UserData {
    name?: string;
    surname?: string;
    middleName?: string;
    sex?: string;
    email?: string;
    phone?: string;
    displayName?: string;
    dateOfBirth?: any,
    wishlist?: any[]
}

interface UserResponse extends UserData {
    _id: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';

    public userDataSubject = new BehaviorSubject<UserData | null>(null);
    public userData$ = this.userDataSubject.asObservable();

    constructor(private http: HttpClient, private router: Router, private wishlistService: WishlistService) {}

    login({ emailPhone, password}: any): Observable<any> {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let credentials = {}
        if (emailPattern.test(emailPhone)) {
            credentials = {
                email: emailPhone,
            }
        } else {
            credentials = {
                phone: emailPhone,
            }
        }
        const loginUrl = `${this.backendUrl}/auth/login`;
        return this.http.post<any>(loginUrl, {...credentials, password: password}).pipe(
            map(response => {
                if (response && response.wishlist) {
                    response.wishlist = response.wishlist.map((wishlistItem: any) => ({
                        ...wishlistItem.product, 
                        addedDate: wishlistItem.addedDate 
                      }));
                }
                return response;
                }),
            tap(response => {
                if (response && typeof window !== 'undefined' && localStorage) {
                    localStorage.setItem('authToken', response.token);
                    this.wishlistService.setWishlistItems(response.wishlist)
                    this.userDataSubject.next(response);
                } 
            }),
        );
    }

    register(userData: UserData): Observable<UserResponse> {
        const registerUrl = `${this.backendUrl}/auth/register`;
        return this.http.post<UserResponse>(registerUrl, userData).pipe(
        tap(response => {
            if (response && response.token && typeof window !== 'undefined' && localStorage) {
                localStorage.setItem('authToken', response.token);
                this.userDataSubject.next(response);
            } 
        })
        );
    }
    
    getUser(): Observable<any> {
        let token;
        if (typeof window !== 'undefined' && localStorage) {
            token = localStorage.getItem('authToken');
        }
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        const url = `${this.backendUrl}/auth/me`;
        const options = {
            headers,
            withCredentials: true
        };
        return this.http.get<any>(url, options).pipe(
            map(response => {
                if (response && response.wishlist) {
                  response.wishlist = response.wishlist.map((wishlistItem: any) => ({
                    ...wishlistItem.product, 
                    addedDate: wishlistItem.addedDate 
                  }));
                }
                return response;
            }),
            tap(response => {
                if (response) {
                    this.userDataSubject.next(response);
                } 
            })
        )
    }
    
    logout(): Observable<any> {
        const url = `${this.backendUrl}/auth/logout`;
        const options = {
            withCredentials: true
        };
        return this.http.get<any>(url,options).pipe(
            tap(response => {
                this.userDataSubject.next(null);
                if (typeof window !== 'undefined' && localStorage) {
                    localStorage.removeItem('authToken');
                }
                this.wishlistService.setWishlistItems([])
                this.router.navigate(['/']);
            })
        )
    }

    isAuthenticated(): boolean {
        return !!this.userDataSubject.value;
    }

    updateUser(userData: any): Observable<any> {
        let token;
        if (typeof window !== 'undefined' && localStorage) {
            token = localStorage.getItem('authToken');
        }
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        const options = {
            headers,
            withCredentials: true
        };
        return this.http.put(`${this.backendUrl}/auth/update`, userData, options);
    }

    deleteUser() {
        let token;
        if (typeof window !== 'undefined' && localStorage) {
            token = localStorage.getItem('authToken');
        }
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        const options = {
            headers,
            withCredentials: true
        };
        return this.http.delete(`${this.backendUrl}/auth/delete`, options).pipe(
            tap(response => {
                    this.userDataSubject.next(null);
                    if (typeof window !== 'undefined' && localStorage) {
                        localStorage.removeItem('authToken');
                    }
                    this.router.navigate(['/']);
                })
            );
    }

}
