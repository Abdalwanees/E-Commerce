import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('E_Token') != null) {
      let Myheader: any = { token: localStorage.getItem('E_Token') };

      request = request.clone({
        setHeaders: Myheader,
      });
    }
    return next.handle(request);
  }
}
