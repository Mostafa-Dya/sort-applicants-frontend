import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublicEntitieService {

  constructor(private http: HttpClient) { }

  getPublicEntitieData(): Observable<any> {
    return this.http.get<any>(environment.api + 'get-public-entities');
  }

  getPublicEntitieDataId(public_entitie_id:number): Observable<any> {
    return this.http.get<any>(`${environment.api}public-entities-get/${public_entitie_id}`);
  } 

  createPublicEntitieData(data): Observable<any> {
    return this.http.post<any>(environment.api + 'create-public-entities', data);
  }

  updatePublicEntitieData(public_entitie_id:number,data): Observable<any> {
    return this.http.put<any>(`${environment.api}update-public-entities/${public_entitie_id}`, data);
  }

  deletePublicEntity(data): Observable<any> {
    let params: HttpParams;

    if (data.level === 0) {
        // Node is a top-level public entity
        return this.http.delete<any>(`${environment.api}delete-public-entities/${data.id}`);
    } else if (data.level === 1) {
        // Node is a sub-entity
        params = new HttpParams().set('sub_entities[]', data.id.toString());  // Convert to string if necessary
        return this.http.delete<any>(`${environment.api}delete-public-entities/${data.public_entitie_id}`, { params });
    } else if (data.level === 2) {
        // Node is an affiliated entity
        params = new HttpParams().set('affiliated_entity_ids[]', data.id.toString());  // Convert to string if necessary
        return this.http.delete<any>(`${environment.api}affiliated-entities`, { params });
    }  else if (data.level === 3) {
    // Node is an affiliated entity
    params = new HttpParams().set('sub_affiliated_entity_ids[]', data.id.toString());  // Convert to string if necessary
    return this.http.delete<any>(`${environment.api}sub-affiliated-entities`, { params });
}
    else {
        // Handle other cases as needed
        return null;
    }
}








  
  
}


