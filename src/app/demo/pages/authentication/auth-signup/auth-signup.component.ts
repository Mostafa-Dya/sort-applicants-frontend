// auth-signup.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/theme/shared/services/shared.service';
import {AuthService} from "../../../../Auth/auth.service"

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
})
export class AuthSignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';

  constructor(private http: HttpClient,
    private sharedService:SharedService,
    private AuthService:AuthService
    ) {}

  signup(): void {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirmation,
    };
    this.AuthService.register(userData).subscribe(
      response => {
      this.sharedService.openSnackBar("User Registered successfully","close");
        this.name='';
        this.email='';
        this.password='';
        this.passwordConfirmation='';
      // Optionally, you can redirect the user to a different page
    },
    error => {
      console.error('Error registering user:', error);
      // Handle error, show error message, etc.
    })



  }
}
