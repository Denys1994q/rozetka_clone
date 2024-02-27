import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of, switchMap  } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/modals/modal.service';
import { SearchResultsService } from 'src/app/categories/services/search-results.service';
import { IComment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })

export class CommentsService {
    commentsFromApi$ = new BehaviorSubject<IComment[]>([]) 
    sortType$ = new BehaviorSubject<string>('З фото і відео') 
    activeFilterRaiting$ = new BehaviorSubject<number>(0)

    constructor(
        private authService: AuthService, 
        private SearchResultsService: SearchResultsService,
        private modalService: ModalService) { }

    comments$ = combineLatest([this.commentsFromApi$, this.activeFilterRaiting$, this.sortType$]).pipe(
        switchMap(([comments, activeFilter, sortType]) => {
            let filteredComments = activeFilter === 0 ? 
                comments : 
                comments.filter(comment => (comment.raiting || comment.rating) === activeFilter);
    
            switch (sortType) {
                case 'З фото і відео':
                    filteredComments = filteredComments.sort((a, b) => {
                        if (a.photos.length && !b.photos.length ) return -1;
                        if (!a.photos.length  && b.photos.length ) return 1;
                        return 0;
                    });
                    break;
                case 'За датою':
                    filteredComments = filteredComments.sort((a, b) => {
                        const dateA = new Date(a.createdAt || a.date).getTime();
                        const dateB = new Date(b.createdAt || b.date).getTime();
                        return dateB - dateA;
                    });
                    break;
                case 'Найкорисніші':
                        filteredComments = filteredComments.sort((a, b) => {
                        const scoreA = a.likes.length - a.dislikes.length;
                        const scoreB = b.likes.length - b.dislikes.length;
                        return scoreB - scoreA;
                    });
                    break;
                default:
                    break;
            }
            return of(filteredComments);
        })
    );
    
    setComments(commentsFromApi: IComment[]) {
        this.commentsFromApi$.next(commentsFromApi)
    }
    setActiveFilter(filterValue: number) {
        this.activeFilterRaiting$.next(filterValue)
    }
    setSortOption(sortValue: string) {
        this.sortType$.next(sortValue)
    }

    writeComment() {
        if (!this.authService.isAuthenticated()) {
            this.modalService.openDialog('login')
        } else {
            this.modalService.openDialog('create-comment')
        }
    }

    resetOptions() {
        this.setActiveFilter(0)
        this.setSortOption('З фото і відео')
        this.SearchResultsService.selectedInputs = []
    }

}
