import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {catchError, Observable, retry} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpErrorResponseService} from '../http-error-response.service';
import {Idea} from './idea';
import {IdeaForCreation} from './idea-for-creation';

@Injectable({
  providedIn: 'root',
})
export class IdeasService {
  private httpClient = inject(HttpClient);
  private httpErrorResponseService = inject(HttpErrorResponseService);

  apiUrl = `${environment.apiUrl}/ideas`;

  getAll(): Observable<Idea[]> {
    return this.httpClient.get<Idea[]>(this.apiUrl).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }

  getByTag(tagName: string): Observable<Idea[]> {
    return this.httpClient.get<Idea[]>(`${environment.apiUrl}/tags/${tagName}/ideas`).pipe(
      retry(3),
      catchError(this.httpErrorResponseService.handleError)
    )
  }

  get(id: string): Observable<Idea> {
    return this.httpClient.get<Idea>(`${this.apiUrl}/${id}`).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }

  update(idea: Idea): Observable<Object> {
    return this.httpClient.put(`${this.apiUrl}/${idea.id}`, idea).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }

  add(idea: IdeaForCreation): Observable<Idea> {
    return this.httpClient.post<Idea>(`${this.apiUrl}`, idea).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }

  archive(idea: Idea): Observable<Object> {
    return this.httpClient.delete(`${this.apiUrl}/${idea.id}`).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }

  getAllTags(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiUrl}/tags`).pipe(
      retry(3),
      catchError(this.httpErrorResponseService.handleError)
    )
  }
}
