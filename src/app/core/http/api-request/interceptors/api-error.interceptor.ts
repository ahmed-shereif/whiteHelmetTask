import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToasterService } from '../../../services/toaster.service';
import { ToasterTypes } from '@shared/toaster/enums/toasterTypes';

export const ApiErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const toasterService = inject(ToasterService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = '';

            if (error.error instanceof ErrorEvent) {
                errorMessage = `Client-side error: ${error.error.message}`;
            } else {
                errorMessage = `Server error: Status ${error.status}, Message: ${error.message}`;

                switch (error.status) {
                    case 401:
                        errorMessage = 'Unauthorized access. Please log in.';
                        break;
                    case 403:
                        errorMessage = 'Forbidden: You do not have permission to access this resource.';
                        break;
                    case 404:
                        errorMessage = 'Resource not found.';
                        break;
                    case 500:
                        errorMessage = 'Internal server error. Please try again later.';
                        break;
                }
            }

            console.error(errorMessage);

            const customError = {
                message: errorMessage,
                status: error.status,
                originalError: error
            };

            toasterService?.openToaster(ToasterTypes.error, {
                data: {
                    title: 'error',
                    message: errorMessage,
                },
            });

            return throwError(() => customError);
        })
    );
};


