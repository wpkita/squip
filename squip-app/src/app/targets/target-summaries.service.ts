import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponseService } from '../http-error-response.service';
import { TargetSummary } from './target-summary';

@Injectable({
  providedIn: 'root',
})
export class TargetSummariesService {
  apiUrl = `${environment.apiUrl}/targetSummaries`;

  constructor(
    private httpClient: HttpClient,
    private httpErrorResponseService: HttpErrorResponseService
  ) {}

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
