import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../modules/auth/services/auth.service';
import { SessionData } from '../../modules/auth/interfaces/session-data';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const sessionData: SessionData = this.authService.loadSession();
    let header: object = {};

    if (sessionData) {
      header = {
        headers: request.headers.set('Authorization', 'Bearer ' + sessionData.token.accessToken)
      };
    }

    const headers = request.clone(header);
    return next.handle(headers);
  }

}
