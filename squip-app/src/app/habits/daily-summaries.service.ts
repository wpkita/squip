import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {catchError, Observable, retry} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpErrorResponseService} from '../http-error-response.service';
import {DailySummary} from './daily-summary';

@Injectable({
  providedIn: 'root',
})
export class DailySummariesService {
  private httpClient = inject(HttpClient);
  private httpErrorResponseService = inject(HttpErrorResponseService);

  apiUrl = `${environment.apiUrl}/dailySummaries`;

  get(): Observable<DailySummary> {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return this.httpClient
      .get<DailySummary>(`${this.apiUrl}?timeZone=${timeZone}`)
      .pipe(
        retry(3),
        catchError((errorResponse: HttpErrorResponse) =>
          this.httpErrorResponseService.handleError(errorResponse)
        )
      );
  }
}
