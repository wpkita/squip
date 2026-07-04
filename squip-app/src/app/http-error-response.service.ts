import {HttpErrorResponse} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {throwError} from 'rxjs';
import {LogService} from './log.service';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorResponseService {
  private notificationService = inject(NotificationService);
  private logService = inject(LogService);


  handleError(error: HttpErrorResponse) {
    this.logService.logInfo(error.status + ':' + error.message);
    if (error.status === 0) {
      this.notificationService.notify('Could not reach server.');
    } else if (error.status === 404) {
      this.notificationService.notify('No results found.');
    } else if (error.status === 500) {
      this.notificationService.notify('Server error. Please try again later.');
    }

    return throwError(() => new Error('An HTTP error occurred.'));
  }
}
