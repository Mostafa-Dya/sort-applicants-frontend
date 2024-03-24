import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(private http: HttpClient) {}

  exportGovernorateExcel(): Observable<Blob> {
    return this.http.get(environment.api + 'export-governorate', {
      responseType: 'blob', // Specify response type as Blob
    });
  }

  exportJobDescriptionExcel(): Observable<Blob> {
    return this.http.get(environment.api + 'export-job-description', {
      responseType: 'blob', // Specify response type as Blob
    });
  }

  exportJobDescriptionHeader(): Observable<Blob> {
    return this.http.get(environment.api + 'export-job-description-headers', {
      responseType: 'blob', // Specify response type as Blob
    });
  }

  exportApplicants(searchFilter: any): Observable<Blob> {
    // Construct the URL with the search filter parameters
    const url = environment.api + 'export-applicants';

    // Pass the search filter parameters as query parameters
    const params = new HttpParams({ fromObject: searchFilter });

    // Make the HTTP GET request with the constructed URL and query parameters
    return this.http.get(url, {
      params,
      responseType: 'blob', // Specify response type as Blob
    });
  }

  exportApplicantsHeader(): Observable<Blob> {
    return this.http.get(environment.api + 'export-applicants-headers', {
      responseType: 'blob', // Specify response type as Blob
    });
  }

  importJobDescriptionHeader(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(
      environment.api + 'import-job-description-data',
      formData,
    );
  }

  importApplicantsHeader(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(environment.api + 'import-applicants-data', formData);
  }
}
