import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env} from 'src/environments/environment.prod';
import ls from 'localstorage-slim';

@Injectable({
  providedIn: 'root'
})

export class TokenAuthService {

  private tokenIssuer = {
    login: env.api+'login',
  }

  constructor(private router:Router) {
    ls.config.encrypt = true;
   }

  setTokenStorage(token:any){
    ls.set('token', token);
    
  }

  getJwtToken(){
    return ls.get('token'); 
  }

  // Validate token
  validateToken(){
     const token = this.getJwtToken();

     if(token){
       const payload = this.payload(token);
       if(payload){
         return Object.values(this.tokenIssuer).indexOf(payload.iss) > -1 ? true : false;
       }
     } else {
        return false;
     }
     return false
  }

  payload(token:any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state
  isSignedin() {
    this.router.navigate(['/flow'])
    return this.validateToken();
  }

  // Destroy token
  destroyToken(){
    //localStorage.removeItem('token');
    const language = localStorage.getItem('i18nextLng') || "en";
    localStorage.clear()
    localStorage.setItem('i18nextLng',language)
  }

}