import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from './core/http/spinner/interceptor/spinner.interceptor';
import { ApiErrorInterceptor } from './core/http/api-request/interceptors/api-error.interceptor';
import { AuthInterceptor } from './core/auth/interceptor/auth.Interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthInterceptor, spinnerInterceptor, ApiErrorInterceptor])
    ),
  ]
};
