import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RegisterUser, CreateAccountActionTypes, RegisterUserSuccessful, RegisterUserFailed } from './create-account.actions';
import { mergeMap, map, catchError, tap, switchMap } from 'rxjs/operators';
import { CreateAccountService } from '../services/create-account.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest } from '../../login/state_management/session.actions';

@Injectable()
export class CreateAccountEffects {
  @Effect()
  registerUser$ = this.actions$.pipe(
    ofType<RegisterUser>(CreateAccountActionTypes.RegisterUser),
    mergeMap(action=> this.createAccountService.registerUser(action.userData).pipe(
      switchMap(response=>[
        // this.router.navigateByUrl('/dashboard');
        new RegisterUserSuccessful(),
        new LoginRequest({password: action.userData.password, phone: action.userData.phone})
      ]
      ),
      catchError(errorResponse=>{
        return of(new RegisterUserFailed());
      })
    ))
  );
  constructor(
    public actions$: Actions,
    public createAccountService: CreateAccountService,
    private router: Router
  ){}

}