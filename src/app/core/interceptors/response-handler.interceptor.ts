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

import { environment } from '../../../environments/environment';
import { ResponseHandlerService } from '../services/response-handler.service';

@Injectable()
export class ResponseHandlerInterceptor implements HttpInterceptor {

  API_URL: string = environment.url + environment.api_prefix;

  constructor(
    private responseHandlerService: ResponseHandlerService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const method: boolean = (request.method == 'POST' || request.method == 'PUT' || request.method == 'PATCH') ? true : false;

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && method && request.url != this.API_URL + 'login') {
          this.responseHandlerService.showResponse(event);
        }
        return event;
      }), catchError((error: HttpErrorResponse) => {
        if (method && request.url != this.API_URL + 'login') {
          this.responseHandlerService.showResponse(error);
        }
        return throwError(error);
      })
    );
  }
}
