import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenAuthService } from './token-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService implements CanActivate {
  constructor(private token: TokenAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      const type=localStorage.getItem('role')
    if (type=='User') {
      return true;
    } else {
      
      this.router.navigate(['**']);
      return false;
    }
  }
}
