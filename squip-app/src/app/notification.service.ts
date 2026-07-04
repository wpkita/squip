import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  subject = new Subject<string>();
  constructor() {}

  notify(message: string) {
    this.subject.next(message);
  }

  getMessage(): Observable<string> {
    return this.subject;
  }
}
