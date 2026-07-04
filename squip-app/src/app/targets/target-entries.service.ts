import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TargetEntry } from './target-entry';
import { environment } from 'src/environments/environment';
import { HttpErrorResponseService } from '../http-error-response.service';
import { catchError, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TargetEntriesService {
  apiUrl = `${environment.apiUrl}/targets/{targetId}/targetEntries`;

  constructor(
    private httpClient: HttpClient,
    private httpErrorResponseService: HttpErrorResponseService
  ) {}

  add(targetEntry: TargetEntry): Observable<TargetEntry> {
    return this.httpClient
      .post<TargetEntry>(
        this.apiUrl.replace('{targetId}', targetEntry.targetId),
        targetEntry
      )
      .pipe(
        retry(3),
        catchError((httpErrorResponse: HttpErrorResponse) =>
          this.httpErrorResponseService.handleError(httpErrorResponse)
        )
      );
  }
}
