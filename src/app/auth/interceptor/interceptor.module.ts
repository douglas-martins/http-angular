import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {config} from '@essentials/config';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  /**
   * Intercept method for insert the auth token on system.
   * @param req: HttpRequest<any>
   * @param next: HttpHandler
   * @return: Observable<HttpEvent<any>>
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const session = JSON.parse(localStorage.getItem(config.session));

    const dupReq = req.clone({
      headers: (session && session.access_token ? req.headers.set('Authorization', 'Bearer ' + session.access_token) : null),
    });
    return next.handle(dupReq);
  }
}


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class InterceptorModule { }
