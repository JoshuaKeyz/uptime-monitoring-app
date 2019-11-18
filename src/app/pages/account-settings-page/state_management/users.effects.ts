import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { GetUserRequest, UserActionTypes, GetUserSucess, GetUserFailure, UpdateUserNameRequest, UpdateUserNameSuccess, UpdateUserNameFailure, UpdateUserPasswordRequest, UpdateUserPasswordSuccess, UpdateUserPasswordFailure, DeleteUserRequest } from './users.actions';
import { withLatestFrom, switchMap, filter, map, catchError, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/ngrx';
import { of } from 'rxjs';
import { UserModel } from '../domain-models/user.model';
import { ServerErrorModel } from '../domain-models/server-error.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {
  @Effect()
  getUser$ = this.actions$.pipe(
    ofType<GetUserRequest>(UserActionTypes.GetUserRequest),
    withLatestFrom(this.store.select('user'), this.store.select('session')),
    filter(([action, user, session])=> user.phone === undefined),
    mergeMap(([action, user, session])=> this.userService.getUser(session.authToken.phone).pipe(
      map((userData: UserModel)=> new GetUserSucess(userData)),
      catchError((error: ServerErrorModel)=>of(new GetUserFailure(error)))
    ))
  );
  
  @Effect()
  changeUserName$ = this.actions$.pipe(
    ofType<UpdateUserNameRequest>(UserActionTypes.UpdateUserNameRequest),
    mergeMap(action=> this.userService.changeUserName(action.user.phone, action.user.firstName, action.user.lastName).pipe(
      map((updatedUser: UserModel)=> {
        this.router.navigateByUrl('/dashboard')
        return new UpdateUserNameSuccess(action.user)
      }),
      catchError((error: ServerErrorModel)=> of(new UpdateUserNameFailure(error)))
    ))
  )
  
  @Effect()
  changeUserPassword$ = this.actions$.pipe(
    ofType<UpdateUserPasswordRequest>(UserActionTypes.UpdateUserPasswordRequest),
    withLatestFrom(this.store.select('user')),
    mergeMap(([action, user]) => this.userService.changePasssword(user.phone, action.password).pipe(
      map((success)=> {
        this.router.navigateByUrl('/dashboard')
        return new UpdateUserPasswordSuccess()}),
      catchError((error: ServerErrorModel)=> of(new UpdateUserPasswordFailure(error)))
    ))
  );

  @Effect() 
  deleteUserRequest$ = this.actions$.pipe(
    ofType<DeleteUserRequest>(UserActionTypes.DeleteUserRequest),
    withLatestFrom(this.store.select('user')),
    mergeMap(([action, user])=> this.userService.deleteUser(user.phone).pipe(
      map((user)=> {
        return;
      })
    ))
  )
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<State>,
    private router: Router
  ) {}
}