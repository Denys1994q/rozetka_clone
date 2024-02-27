import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IComment } from "../models/comment.model";
import { Observable, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CommentsApiService {
    private backendUrl = 'https://evergreen-purrfect-agenda.glitch.me';

    constructor(
        private http: HttpClient) { }

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

    addLike(productId: string, commentId: string):Observable<{comment: IComment, message: string, likes: number, dislikes: number}> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/products/${productId}/comments/${commentId}/like` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.post<{comment: IComment, message: string, likes: number, dislikes: number}>(apiUrl, null, options);
        } else {
            return throwError('Local storage is not available.');
        }
    }

    addDislike(productId: string, commentId: string):Observable<{comment: IComment, message: string, dislikes: number, likes: number}> {
        if (typeof window !== 'undefined' && localStorage) {
            const apiUrl = `${this.backendUrl}/products/${productId}/comments/${commentId}/dislike` 
            const token = localStorage.getItem('authToken');
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
            const options = {
                headers,
                withCredentials: true
            };
            return this.http.post<{comment: IComment, message: string, dislikes: number, likes: number}>(apiUrl, null, options);
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

}