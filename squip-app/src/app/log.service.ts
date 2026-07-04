import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  apiUrl = `${environment.apiUrl}/logs`;

  constructor(private http: HttpClient) {}

  logInfo(message: string) {
    return this.http.post(this.apiUrl, {message});
  }
}
