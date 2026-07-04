import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponseService } from '../http-error-response.service';
import { TargetSummary } from './target-summary';

@Injectable({
  providedIn: 'root',
})
export class TargetSummariesService {
  private httpClient = inject(HttpClient);
  private httpErrorResponseService = inject(HttpErrorResponseService);

  apiUrl = `${environment.apiUrl}/targetSummaries`;

  get(): Observable<TargetSummary[]> {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return this.httpClient
      .get<TargetSummary[]>(`${this.apiUrl}?timeZone=${timeZone}`)
      .pipe(
        retry(3),
        catchError((errorResponse: HttpErrorResponse) =>
          this.httpErrorResponseService.handleError(errorResponse)
        )
      );
  }
}
