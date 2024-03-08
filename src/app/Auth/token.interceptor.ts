import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenAuthService } from './token-auth.service'; // Import your token service

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token
    const token = this.tokenService.getJwtToken();

    // If the token exists, add it to the request headers
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pass the request to the next interceptor or handler
    return next.handle(request);
  }
}
