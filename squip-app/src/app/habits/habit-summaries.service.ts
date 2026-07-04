import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, retry} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpErrorResponseService} from '../http-error-response.service';
import {HabitSummary} from './habit-summary';

@Injectable({
  providedIn: 'root',
})
export class HabitSummariesService {
  apiUrl = `${environment.apiUrl}/habitSummaries`;

  constructor(
    private httpClient: HttpClient,
    private httpErrorResponseService: HttpErrorResponseService
  ) {}

  get(): Observable<HabitSummary[]> {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return this.httpClient
      .get<HabitSummary[]>(`${this.apiUrl}?timeZone=${timeZone}`)
      .pipe(
        retry(3),
        catchError((errorResponse: HttpErrorResponse) =>
          this.httpErrorResponseService.handleError(errorResponse)
        )
      );
  }
}
