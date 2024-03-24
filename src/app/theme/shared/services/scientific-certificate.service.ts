import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ScientificCertificateService {
  constructor(private http: HttpClient) {}

  getScientificCertificateData(): Observable<any> {
    return this.http.get<any>(environment.api + 'get-scientific-certificate');
  }

  getScientificCertificateDataId(certificate_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.api}scientific-certificate-get/${certificate_id}`,
    );
  }

  createScientificCertificateData(data): Observable<any> {
    return this.http.post<any>(
      environment.api + 'create-scientific-certificate',
      data,
    );
  }

  updateScientificCertificateData(
    certificate_id: number,
    data,
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.api}update-scientific-certificate/${certificate_id}`,
      data,
    );
  }

  deleteScientificCertificateData(
    certificate_id: number,
    data?: any[],
  ): Observable<any> {
    let request: string;
    if (data) {
      request = 'certificate_precise_ids[]';
    }

    let params = new HttpParams();

    // If data exists and is an array, add each element to the query parameters
    if (data && Array.isArray(data)) {
      data.forEach((value) => {
        params = params.append(request, value.toString());
      });
    } else if (data) {
      // If data is a single value, add it as a single parameter
      params = params.set(request, data?.toString() || '');
    }

    return this.http.delete<any>(
      `${environment.api}delete-scientific-certificate/${certificate_id}`,
      { params },
    );
  }
}
