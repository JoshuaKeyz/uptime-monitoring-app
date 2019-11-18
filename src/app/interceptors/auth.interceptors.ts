import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../ngrx';
import { mergeMap, switchMap, exhaustMap } from 'rxjs/operators';
import { AuthTokenModel } from '../pages/login/domain-models/auth-token.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authTokenStr = localStorage.getItem('userToken');
    if(authTokenStr && authTokenStr.length > 0) {
      const authTokenObj: AuthTokenModel = JSON.parse(authTokenStr);
      const authReq = req.clone({
        setHeaders: {
          token: authTokenObj.id
        }
      })
      return next.handle(authReq);
    }
    return next.handle(req);
  }
  constructor(private store: Store<State>) { }
}