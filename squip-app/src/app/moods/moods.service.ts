import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponseService } from '../http-error-response.service';
import { Mood } from './mood';
import { MoodForCreation } from './mood-for-creation';

@Injectable({
  providedIn: 'root',
})
export class MoodsService {
  private httpClient = inject(HttpClient);
  private httpErrorResponseService = inject(HttpErrorResponseService);

  apiUrl: string = `${environment.apiUrl}/moods`;

  get(): Observable<Mood[]> {
    return this.httpClient.get<Mood[]>(this.apiUrl).pipe(
      retry(3),
      catchError((httpErrorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(httpErrorResponse)
      )
    );
  }

  add(mood: MoodForCreation): Observable<Mood> {
    return this.httpClient.post<Mood>(this.apiUrl, mood).pipe(
      retry(3),
      catchError((httpErrorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(httpErrorResponse)
      )
    );
  }
}
