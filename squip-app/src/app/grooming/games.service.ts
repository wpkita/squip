import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {catchError, Observable, retry} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpErrorResponseService} from '../http-error-response.service';
import {Game} from './game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private httpClient = inject(HttpClient);
  private httpErrorResponseService = inject(HttpErrorResponseService);

  apiUrl = `${environment.apiUrl}/games`;

  getNextGame(filter: string): Observable<Game> {
    return this.httpClient.get<Game>(`${this.apiUrl}?filter=${filter}`).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }

  saveGame(game: Game): Observable<Game> {
    return this.httpClient.put<Game>(this.apiUrl, game).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }
}
