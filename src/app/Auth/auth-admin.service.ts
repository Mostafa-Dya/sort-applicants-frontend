import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenAuthService } from './token-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminService implements CanActivate {
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
    if (type=='Admin') {
      return true;
    } else {
      this.router.navigate(['**']);
      return false;
    }
  }
}
