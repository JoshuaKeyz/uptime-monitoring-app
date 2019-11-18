import { Injectable } from "@angular/core";
import { SessionService } from '../services/session.service';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { 
  LoginRequest,
  SessionActionTypes,
  LoginFailure,
  LoginSuccess,
  LogoutRequest,
  LogoutFailure,
  LogoutSuccess,
  UpdateSessionRequest,
  UpdateSessionFailure,
  UpdateSessionSuccess 
} from './session.actions';

import {
  mergeMap,
  catchError,
  tap,
  map,
  withLatestFrom,
  filter,
  switchMap,
  throttle
} from 'rxjs/operators';
import { LoginFailureModel } from '../domain-models/login-failure.model';
import {
  of,
  defer,
  interval
} from 'rxjs';
import { LoginSuccessModel } from '../domain-models/login-success.model';
import { Router } from '@angular/router';
import { AuthTokenModel } from '../domain-models/auth-token.model';
import { LogoutFailureModel } from '../domain-models/logout-failure.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/ngrx';
import { UpdateSessionFailureModel } from '../domain-models/update-session-failure.model';
import { UpdatedSessionSuccessModel } from '../domain-models/updated-session-success.model';

@Injectable()
export class LoginEffects {
  @Effect()
  loginRequest$ = this.actions$.pipe(
    ofType<LoginRequest>(SessionActionTypes.LoginRequest),
    switchMap(action => this.sessionService.login(action.loginRequestModel).pipe(
      map((loginSuccess: LoginSuccessModel) => {
        localStorage.setItem('userToken', JSON.stringify(loginSuccess.tokenObj))
        this.router.navigateByUrl('/dashboard');;
        return new LoginSuccess(loginSuccess)
      }),
      catchError((err: LoginFailureModel) => {
        console.error(err, 'error');
        return of(new LoginFailure(err));
      }),
    ))
  );
  @Effect()
  updateSessionRequest$ = this.actions$.pipe(
    ofType<UpdateSessionRequest>(SessionActionTypes.UpdateSessionRequest),
    throttle(()=>interval(300000)),
    withLatestFrom(this.store.select('session')),
    filter(([action, authState]) => authState.isAuth),
    mergeMap(([action, authState]) => {
      const authToken = authState.authToken;
      if (parseInt(authToken.expires) > Date.now()) {
        console.log(authState)
        return this.sessionService.updateSession({ extend: true, id: authToken.id }).pipe(
          catchError((errorData: UpdateSessionFailureModel) => {
            return of(new UpdateSessionFailure());
          }),
          tap((updatedSession: UpdatedSessionSuccessModel) => {
            localStorage.setItem('userToken', JSON.stringify(updatedSession))
          }),
          map((updatedSession: UpdatedSessionSuccessModel) => new UpdateSessionSuccess(updatedSession))
        )
      } else {
        return of(new UpdateSessionFailure());
      }
    })
  );
  @Effect()
  logout$ = this.actions$.pipe(
    ofType<LogoutRequest>(SessionActionTypes.LogoutRequest),
    mergeMap(action => this.sessionService.logout(action.logoutRequestModel).pipe(
      map((logoutSuccess: {}) => new LogoutSuccess()),
      tap(_ => {
        localStorage.removeItem('userToken');
        this.router.navigateByUrl('/logout')
      }),
      catchError((errorObj: LogoutFailureModel) => of(new LogoutFailure(errorObj))),
    )),
  );
  @Effect()
  onPageReload$ = defer<LoginSuccess | any>(() => {
    const userTokenStr = localStorage.getItem('userToken');
    if (userTokenStr) {
      const userToken: AuthTokenModel = JSON.parse(userTokenStr);
      if (parseInt(userToken.expires) > Date.now()) {
        return of(new LoginSuccess({ tokenObj: userToken }));
      } else {
        return of(new LogoutRequest(userToken))
      }
    }
  });

  constructor(
    private actions$: Actions,
    private sessionService: SessionService,
    private router: Router,
    private store: Store<State>
  ) { }

}