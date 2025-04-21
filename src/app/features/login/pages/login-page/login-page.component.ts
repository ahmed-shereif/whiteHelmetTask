import { Component, inject, DestroyRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControlErrorComponent } from '@shared/form-control-error/form-control-error.component';
import { LoginService } from '../../services/login-service.service';
import { LoginRequest } from '../../models/loginRequest';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginResponse } from '../../models/loginResponse';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ToasterTypes } from '@shared/toaster/enums/toasterTypes';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    FormControlErrorComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private toasterService = inject(ToasterService);
  private router = inject(Router);
  hidePassword = true;
  private destroyRef = inject(DestroyRef);

  constructor(public loginService: LoginService) { }

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);

      this.loginService
        .login({ ...this.loginForm.value, expiresIn: 600000 } as LoginRequest)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response: LoginResponse) => {
            console.log('Login successful:', response);
            if (response.accessToken) {
              sessionStorage.setItem('authToken', response.accessToken);
              sessionStorage.setItem('expireIn', String(response.expiresIn ?? ''));
              this.loginService.userSubject.next(response?.user);
              this.toasterService.openToaster(ToasterTypes.success, {
                data: {
                  title: 'Login successful',
                  message: "Welcome back",
                },
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
              this.router.navigate(['/users']);
              this.logOutAfterTokenExpire()
              console.log('Token saved to sessionStorage:', response.accessToken);
            }

          },
          error: (error) => {
            console.error('Login failed:', error);
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  logOutAfterTokenExpire() {
    setTimeout(() => {
      this.router.navigate(['/login']);
      sessionStorage.clear()

      this.toasterService.openToaster(ToasterTypes.success, {
        data: {
          title: 'Token expire',
          message: "please login again",
        },
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });

    }, parseInt(sessionStorage.getItem('expireIn') ?? '600000'));
  }
}