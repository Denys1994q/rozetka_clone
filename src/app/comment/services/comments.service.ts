import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/modals/modal.service';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { Comment } from '../comment.component';

export interface IComment {
    raiting: number,
    content: string,
    advantages?: string,
    disadvantages?: string,
    photos?: string[]
}

@Injectable({ providedIn: 'root' })

export class CommentsService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';
    comments!: Comment[]
    filteredComments!: Comment[] | null
    // тип сортування
    sortType: string = 'З фото і відео'

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

    setComments(comments: any) {
        this.filteredComments = null
        this.comments = comments
    }

    filterProdComments(selectedRaiting?: number) {
        if (selectedRaiting) {
            this.filteredComments = this.comments.filter((review: any) => (review.rating || review.raiting) === selectedRaiting)
            this.sortProdComments(this.sortType)
        } else {
            this.filteredComments = this.comments
            this.sortProdComments(this.sortType)
            // скидаємо значення selectedRaitingIndex, яке в іншому сервісі знаходиться 
            this.SearchResultsService.resetRaitingValue()
        }
      }
  
    sortProdComments(sortType: string) {
        if (!this.filteredComments) {
            this.filteredComments = [...this.comments]
        }
        this.sortType = sortType
        if (sortType === 'З фото і відео') {
            this.filteredComments = [...this.filteredComments].sort((a,b) => {
            if (a.photo){
                return -1;
            }
            if (b.photo){
                return 1;
            }
            return 0;
          })
        } else if (sortType === 'За датою') {
            this.filteredComments = [...this.filteredComments].sort((a: any, b: any) => {
                const dateA = new Date(a.createdAt).getTime() || new Date(a.date).getTime();
                const dateB = new Date(b.createdAt).getTime() || new Date(b.date).getTime();;
                // Спочатку нові
                return dateB - dateA;
            });
        } else if (sortType === 'Найкорисніші') {
            this.filteredComments = [...this.filteredComments].sort((a,b) => (b.likes+b.dislikes) - (a.likes+a.dislikes))
        }
    }

      resetSortType() {
        this.sortType = 'З фото і відео'
      }

}