import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../../../Auth/auth.service"
import { TokenAuthService } from 'src/app/Auth/token-auth.service';
import { AuthenticationStateService } from 'src/app/Auth/authentication-state.service';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';
@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export class AuthSigninComponent implements OnInit{
  login!: FormGroup;
  err = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private AuthService:AuthService,
    private tokenAuthService: TokenAuthService,
    private authenticationStateService: AuthenticationStateService,
    private translate:TranslationService,

    ){
    this.login = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.translate.setLanguage(localStorage.getItem('i18nextLng'));

  }


  onSubmit() {
    if(localStorage.getItem('i18nextLng')=== null){
      localStorage.setItem('i18nextLng','en');
    }

    if (this.login.invalid) {
      Object.keys(this.login.controls).forEach((controlName) =>
        this.login.controls[controlName].markAsTouched()
      );
      return;
    }
    this.AuthService.login(this.login.value).subscribe((res)=>{
      localStorage.setItem('role', res.role);
      localStorage.setItem('username', res.name);
      if(res.permissions){
        localStorage.setItem('permissions', JSON.stringify(res.permissions));
      }
      this.tokenStorage(res.token);

    },
    (error) => {
      this.err = error.error.error.message;
      this.login.reset();
    },
    () => {
      this.authenticationStateService.setAuthState(true);
      this.login.reset();
      const type = localStorage.getItem('role')!.toString();
      if (type == 'Admin') {
        console.log('Admin')
        this.router.navigate(['/sort-applicants']);
      } else if (type == 'User') {
        console.log('User')
        this.router.navigate(['/sort-applicants']);
      }
    })
  }
  tokenStorage(jwt: any) {
    this.tokenAuthService.setTokenStorage(jwt);
  }
}
