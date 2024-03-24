import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GenerateResultsService {
  constructor(private http: HttpClient) {}

  generateResults(data?): Observable<any> {
    return this.http.post<any>(environment.api + 'sort-applicants', data);
  }

  cancelResults(data?): Observable<any> {
    return this.http.post<any>(environment.api + 'revert-applicants', data);
  }
}
