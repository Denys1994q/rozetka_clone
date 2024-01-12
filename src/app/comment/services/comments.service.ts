import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, map, combineLatest, take  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/modals/modal.service';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { IComment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })

export class CommentsService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';
    comments$ = new BehaviorSubject<IComment[]>([]) 
    filteredComments$ = new BehaviorSubject<IComment[] | null>([]) 
    sortType$ = new BehaviorSubject<string>('З фото і відео') 

    constructor(
        private http: HttpClient, 
        private authService: AuthService, 
        private SearchResultsService: SearchResultsService,
        private modalService: ModalService) { }

    writeComment() {
        if (!this.authService.isAuthenticated()) {
            this.modalService.openDialog('login')
        } else {
            this.modalService.openDialog('create-comment')
        }
    }

    addComment(productId: string, body: IComment):Observable<{message: string} | void> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/products/${productId}/add-comment` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.post<{message: string}>(apiUrl, body, options);
        } else {
            return throwError('Local storage is not available.');
        }
    }

    addLike(productId: string, commentId: string):Observable<{message: string, likes: number, dislikes: number}> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/products/${productId}/comments/${commentId}/like` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.post<{message: string, likes: number, dislikes: number}>(apiUrl, null, options);
        } else {
            return throwError('Local storage is not available.');
        }
    }

    addDislike(productId: string, commentId: string):Observable<{message: string, dislikes: number, likes: number}> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/products/${productId}/comments/${commentId}/dislike` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.post<{message: string, dislikes: number, likes: number}>(apiUrl, null, options);
        } else {
            return throwError('Local storage is not available.');
        }
    }

    uploadPhoto(file: File) {
        const apiUrl = `${this.backendUrl}/uploads` 
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        const options = {
            headers,
            withCredentials: true
        };
        const formData = new FormData();
        formData.append('image', file);
        return this.http.post<any>(apiUrl, formData, options);
    }

    setComments(comments: IComment[]) {
        this.filteredComments$.next(null)
        this.comments$.next(comments)
        
        this.filterProdComments()
    }

    filterProdComments(selectedRaiting?: number) {
        this.comments$.pipe(
            map((comments) => {
                if (selectedRaiting) {
                    return comments.filter((review: IComment) => (review.rating || review.raiting) === selectedRaiting);
                } else {
                    return comments;
                }
            })
        ).subscribe((result) => {
            this.filteredComments$.next(result);
        });
        this.sortProdComments(this.sortType$.getValue());
        // скидаємо значення selectedRaitingIndex, яке в іншому сервісі знаходиться 
        this.SearchResultsService.resetRaitingValue()
    }
  
    sortProdComments(sortType: string) {
        this.sortType$.next(sortType)

        if (!this.filteredComments$.getValue()) {
            this.filteredComments$.next([...this.comments$.getValue()])
        }

        const sortedComments$ = combineLatest([this.filteredComments$, this.sortType$]).pipe(
            take(1),
            map(([filteredComments, sortType]) => {
                return filteredComments?.sort((a: any, b: any) => {
                    if (sortType === 'З фото і відео') {
                        if (a.photo) {return -1}
                            if (b.photo) {return 1;}
                            return 0;
                        } else if (sortType === 'За датою') {
                            const dateA = new Date(a.createdAt).getTime() || new Date(a.date).getTime();
                            const dateB = new Date(b.createdAt).getTime() || new Date(b.date).getTime();;
                            return dateB - dateA;
                        } else if (sortType === 'Найкорисніші') {
                            const scoreA = a.likes.length - a.dislikes.length;
                            const scoreB = b.likes.length - b.dislikes.length;
                            return scoreB - scoreA;
                        }
                        return 0;
                })
            })
        )

        sortedComments$.subscribe((data: IComment[] | undefined) => {
            if (data) {
                this.filteredComments$.next(data)
            }
        })
    }

    resetSortType() {
        this.sortType$.next('З фото і відео')
    }

}