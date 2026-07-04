import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {catchError, Observable, retry} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpErrorResponseService} from '../http-error-response.service';
import {Hibit} from './hibit';
import {HibitForCreation} from './hibitForCreation';

@Injectable({
  providedIn: 'root',
})
export class HibitsService {
  private httpClient = inject(HttpClient);
  private httpErrorResponseService = inject(HttpErrorResponseService);

  apiUrl = `${environment.apiUrl}/habits/{habitId}/hibits`;

  add(hibit: HibitForCreation): Observable<Hibit> {
    return this.httpClient
      .post<Hibit>(this.apiUrl.replace('{habitId}', hibit.habitId), hibit)
      .pipe(
        retry(3),
        catchError((errorResponse: HttpErrorResponse) =>
          this.httpErrorResponseService.handleError(errorResponse)
        )
      );
  }
}
