import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenAuthService } from './token-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResetService {
  constructor(private token: TokenAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.token.getJwtToken()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
