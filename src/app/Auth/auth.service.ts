import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

interface Permissions 
  {
    id: 1
    user_id: 3
    statusCheck: 1
    sortable: 0
    canActive: 1
    addApplicants: 0
    addCertificate: 1
    addJobDescription: 0
    addGovernorate: 0
    addPublic: 1
    editApplicants: 1
    editCertificate: 0
    editJobDescription: 0
    editGovernorate: 0
    editPublic: 1
    deleteApplicants: 0
    deleteCertificate: 1
    deleteJobDescription: 0
    deleteGovernorate: 0
    deletePublic: 1
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  permissions = Permissions;
  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(environment.api + 'login', user);
  }

  logout(): Observable<any> {
    return this.http.get<any>(environment.api + 'logout');
  }

  getUsers():Observable<any>{
    
    return this.http.get<any>(environment.api + 'users');

  }

  getUsersByID(userID:number):Observable<any>{
    
    return this.http.get<any>(environment.api + 'user/'+ userID);

  }

  updateCanActive(userId: number, canActive: boolean): Observable<any> {
    return this.http.put<any>(environment.api + 'updateCanActive/' + userId, { canActive });
  }

  updatePermissions(permissions: any, userId: number): Observable<any> {
    console.log(userId)
    return this.http.put<any>(environment.api +'permissions/'+ userId, permissions);
  }

  permissionsService(){
    const permissionsValues = localStorage.getItem('permissions')
    if(permissionsValues){
      this.permissions = JSON.parse(permissionsValues);
    }
    return this.permissions;
  }




  public isLoading :  BehaviorSubject<boolean>= new BehaviorSubject<boolean> (false);
  isLoading$ = this.isLoading.asObservable();
  setLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }
}
