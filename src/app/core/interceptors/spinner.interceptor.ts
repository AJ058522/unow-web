import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  spinner: boolean = false;

  constructor(
    private spinnerService: SpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.method == 'POST' || request.method == 'PUT' || request.method == 'PATCH'){
      this.spinnerService.show();
      this.spinner = true;
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {        
        if (event instanceof HttpResponse) {
          if(this.spinner){
            this.spinnerService.hide();
          }
          return event;
        }
      }), catchError((error: HttpErrorResponse) => {
        if(this.spinner){
          this.spinnerService.hide();
        }
      return throwError(error);
      })
    );
    
  }
}
