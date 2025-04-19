import { Component, inject, DestroyRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControlErrorComponent } from '@shared/form-control-error/form-control-error.component';
import { LoginServiceService } from '../../services/login-service.service';
import { LoginRequest } from '../../models/loginrequest';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginResponse } from '../../models/loginResponse';

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
  hidePassword = true;
  private destroyRef = inject(DestroyRef);

  constructor(public loginServiceService: LoginServiceService) { }

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

      this.loginServiceService
        .login(this.loginForm.value as LoginRequest)
        .pipe(takeUntilDestroyed(this.destroyRef)) // Automatically unsubscribe when the component is destroyed
        .subscribe({
          next: (response: LoginResponse) => {
            console.log('Login successful:', response);
            // Handle successful login (e.g., navigate to another page)
          },
          error: (error) => {
            console.error('Login failed:', error);
            // Handle login error (e.g., show an error message)
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}