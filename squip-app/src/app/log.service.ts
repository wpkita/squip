import {HttpClient} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private http = inject(HttpClient);

  apiUrl = `${environment.apiUrl}/logs`;

  logInfo(message: string) {
    return this.http.post(this.apiUrl, {message});
  }
}
