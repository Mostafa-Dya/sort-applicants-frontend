import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenAuthService } from './token-auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateService implements CanActivate {
  constructor(private token: TokenAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.token.getJwtToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
