import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {catchError, Observable, retry} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpErrorResponseService} from '../http-error-response.service';
import {Habit} from './habit';
import {HabitForCreation} from './habit-for-creation';

@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  private httpClient = inject(HttpClient);
  private httpErrorResponseService = inject(HttpErrorResponseService);

  apiUrl = `${environment.apiUrl}/habits`;

  add(habit: HabitForCreation): Observable<Habit> {
    return this.httpClient.post<Habit>(this.apiUrl, habit).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }

  update(habit: Habit): Observable<Habit> {
    return this.httpClient.put<Habit>(`${this.apiUrl}/${habit.id}`, habit).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }

  delete(habit: Habit): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${habit.id}`).pipe(
      retry(3),
      catchError((errorResponse: HttpErrorResponse) =>
        this.httpErrorResponseService.handleError(errorResponse)
      )
    );
  }
}
