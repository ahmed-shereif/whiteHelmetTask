import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../service/spinner.service';
import { finalize } from 'rxjs';
import { SkipLoading } from './skip-spinner.component';

export const spinnerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  if(req.context.get(SkipLoading)) {
    return next(req);
   }

  const spinnerService = inject(SpinnerService);

  spinnerService.incrementRequests();
  return next(req).pipe(
    finalize(()=>spinnerService.decrementRequests())
  );
};
