import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {

  constructor(private http: HttpClient) { }

  getGovernorateData(): Observable<any> {
    return this.http.get<any>(environment.api + 'get-governorates');
  }

  getGovernorateDataId(governorate_id:number): Observable<any> {
    return this.http.get<any>(`${environment.api}governorates-get/${governorate_id}`);
  } 

  createGovernorateData(data): Observable<any> {
    return this.http.post<any>(environment.api + 'create-governorates', data);
  }

  updateGovernorateData(governorate_id:number,data): Observable<any> {
    return this.http.put<any>(`${environment.api}update-governorates/${governorate_id}`, data);
  }

  deleteGovernorateData(governorate_id: number, data?: any[], parentName?: string): Observable<any> {
    let request: string;
    if (parentName) {
      switch (parentName) {
        case "Regions":
          request = "region_ids[]";
          break;
        case "Townships":
          request = "township_ids[]";
          break;
        case "Villages":
          request = "village_ids[]";
          break;
        default:
          request = "";
          break;
      }
    }

    let params = new HttpParams();

    // If data exists and is an array, add each element to the query parameters
    if (data && Array.isArray(data)) {
      data.forEach((value) => {
        params = params.append(request, value.toString());
      });
    } else {
      // If data is a single value, add it as a single parameter
      params = params.set(request, data?.toString() || '');
    }

    console.log(params);
    return this.http.delete<any>(`${environment.api}delete-governorates/${governorate_id}`, { params });
  }
  
  
}


