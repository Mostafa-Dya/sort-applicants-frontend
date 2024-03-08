import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JobDescriptionService {

  constructor(private http: HttpClient
    ) { }




  jobDescriptionWithApplicants(): Observable<any> {
    return this.http.get<any>(environment.api + 'job-descriptions-with-applicants');
  }

  jobDescriptionTableData(data?: any): Observable<any> {
    console.log(data)
    // Use the POST method to send data in the request body
    return this.http.post<any>(environment.api + 'job-description-table', data);
  }

  createJobDescription(data: any): Observable<any> {
    // Use the POST method to send data in the request body
    return this.http.post<any>(environment.api + 'create-job-description-table', data);
  }

  jobDescriptionTableDataShow(id): Observable<any> {
    return this.http.get<any>(environment.api + 'job-description-table-show/' + id);
  }


  jobDescriptionTableDataDelete(id): Observable<any> {

  return this.http.post<any>(environment.api + 'job-description-table-delete', { ids: id });
  }

  jobDescriptionTableDataDeletesolo(id): Observable<any> {

    return this.http.delete<any>(environment.api + 'job-description-table-delete/'+id);
    }

  updateJobDescription(jobID, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(environment.api + 'job-description/' + jobID, data);
  }




}


