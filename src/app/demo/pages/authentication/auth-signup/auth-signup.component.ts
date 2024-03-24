// auth-signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Auth/auth.service';
import { SharedService } from 'src/app/theme/shared/services/shared.service';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
})
export class AuthSignupComponent implements OnInit {
  signupForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private translate: TranslationService,
  ) {}

  ngOnInit(): void {
    this.translate.setLanguage(localStorage.getItem('i18nextLng'));

    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required]],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required],
      },
      {
        validators: this.mustMatch('password', 'password_confirmation'),
      },
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get passwordConfirmation() {
    return this.signupForm.get('password_confirmation');
  }

  signup(): void {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.authService.register(userData).subscribe(
        () => {
          this.sharedService.openSnackBar(
            'User registered successfully',
            'close',
          );
          this.signupForm.reset();
        },
        (error) => {
          console.error('Error registering user:', error);
          // Handle error, show error message, etc.
        },
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
