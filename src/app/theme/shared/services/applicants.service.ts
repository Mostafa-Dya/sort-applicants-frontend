import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ApplicantsService {

  constructor(private http: HttpClient) { }


  // getApplicants(): Observable<any> {
  //   return this.http.get<any>(environment.api + 'applicants');
  // }
  getApplicants(data?: any): Observable<any> {
    // Use the POST method to send data in the request body
    return this.http.post<any>(environment.api + 'applicants', data);
  }
  

  getApplicantsByID(id): Observable<any> {
    return this.http.get<any>(environment.api + 'get-applicants-id/' + id);
  }

  deleteApplicantsByID(id): Observable<any> {
    return this.http.delete<any>(environment.api + 'delete-applicants/' + id);
  }

  deleteApplicantsByIDs(id): Observable<any> {
    return this.http.post<any>(environment.api + 'delete-applicants', { ids: id });
    }
  

  createApplicants(data): Observable<any> {
    return this.http.post<any>(environment.api + 'create-applicants', data);
  }

  updateApplicants(applicantID, data): Observable<any> {
    return this.http.put<any>(environment.api + 'applicants/' + applicantID, data);
  }




}


