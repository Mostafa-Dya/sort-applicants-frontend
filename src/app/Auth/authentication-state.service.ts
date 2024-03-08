import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenAuthService } from './token-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationStateService {
  constructor(public tokenAuthService: TokenAuthService) {}

  private userCurrentState = new BehaviorSubject<boolean>(
     this.tokenAuthService.isSignedin()
  );
  userAuthState = this.userCurrentState.asObservable();

  setAuthState(value: boolean) {
    this.userCurrentState.next(value);
  }
}
