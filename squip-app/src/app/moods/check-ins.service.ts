import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponseService } from '../http-error-response.service';
import { CheckInForCreation } from './check-in-for-creation';

@Injectable({
  providedIn: 'root',
})
export class CheckInsService {
  private httpClient = inject(HttpClient);
  private httpErrorResponseService = inject(HttpErrorResponseService);

  apiUrl = `${environment.apiUrl}/checkins`;

  add(checkIn: CheckInForCreation): Observable<any> {
    return this.httpClient.post(this.apiUrl, checkIn).pipe(
      retry(3),
      catchError((httpErrorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(httpErrorResponse)
      )
    );
  }
}
