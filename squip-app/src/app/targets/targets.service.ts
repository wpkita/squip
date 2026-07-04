import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponseService } from '../http-error-response.service';
import { Target } from './target';
import { TargetForCreation } from './target-for-creation';

@Injectable({
  providedIn: 'root',
})
export class TargetsService {
  private httpClient = inject(HttpClient);
  private httpErrorResponseService = inject(HttpErrorResponseService);

  apiUrl = `${environment.apiUrl}/targets`;

  get(): Observable<Target[]> {
    return this.httpClient.get<Target[]>(this.apiUrl).pipe(
      retry(3),
      catchError((httpErrorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(httpErrorResponse)
      )
    );
  }

  add(target: TargetForCreation): Observable<Target> {
    return this.httpClient.post<Target>(this.apiUrl, target).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }

  update(target: Target): Observable<Target> {
    return this.httpClient
      .put<Target>(`${this.apiUrl}/${target.id}`, target)
      .pipe(
        retry(3),
        catchError((errorResponse: HttpErrorResponse) =>
          this.httpErrorResponseService.handleError(errorResponse)
        )
      );
  }

  delete(target: Target): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${target.id}`).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }
}
