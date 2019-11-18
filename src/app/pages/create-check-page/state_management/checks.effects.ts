import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CreateCheckRequest, CreateCheckActions, CreateCheckFailure, CreateCheckSuccess, GetAllChecks, GetAllChecksSuccess, GetAllChecksFailure, EditCheckRequest, EditCheckSuccess, EditCheckFailure, DeleteCheckRequest, DeleteCheckSuccess, DeleteCheckFailure } from './checks.actions';
import { switchMap, catchError, map, mergeMap, tap, filter, withLatestFrom } from 'rxjs/operators';
import { ChecksService } from '../services/checks.service';
import { CreateCheckErrorModel } from '../domain-models/create-check-error.model';
import { of } from 'rxjs';
import { CreateCheckSuccessModel } from '../domain-models/create-check-success.model';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/ngrx';
import { selectAllChecks } from './checks.reducer';
import { Update } from '@ngrx/entity';

@Injectable()
export class ChecksEffect {
  @Effect()
  createCheckRequest$ = this.actions$.pipe(
    ofType<CreateCheckRequest>(CreateCheckActions.CreateCheckRequestAction),
    mergeMap((action)=> this.checksService.createCheck(action.check).pipe(
      map((checkData: CreateCheckSuccessModel)=> {
        return new CreateCheckSuccess(checkData)
      }),
      tap(checkData=>{
        this.router.navigateByUrl('/dashboard');
      }),
      catchError((error: CreateCheckErrorModel)=> of(new CreateCheckFailure(error)))
    ))
  );

  @Effect() 
  getAllChecks$ = this.actions$.pipe(
    ofType<GetAllChecks>(CreateCheckActions.GetAllChecks),
    withLatestFrom(this.store.pipe(select(selectAllChecks)), this.store.select('session')),
    filter(([action, checks, session])=> checks.length === 0),
    mergeMap(([action, checks, session])=> this.checksService.getChecks(session.authToken.phone).pipe(
      map((checks: Array<CreateCheckSuccessModel>) =>{
        return new GetAllChecksSuccess(checks);
      }),
      catchError((error: CreateCheckErrorModel)=> of(new GetAllChecksFailure(error)))
    )),
  );

  @Effect()
  editCheck$ = this.actions$.pipe(
    ofType<EditCheckRequest>(CreateCheckActions.EditCheckRequest),
    mergeMap(action=> this.checksService.editCheck(action.check).pipe(
      map((check:CreateCheckSuccessModel)=>{
        this.router.navigateByUrl('/dashboard')
        const update: Update<CreateCheckSuccessModel> = {
          id: check.id,
          changes: {
            method: check.method,
            protocol: check.protocol,
            url: check.url,
            successCodes: check.successCodes,
            timeoutSeconds: check.timeoutSeconds
          }
        }
        return new EditCheckSuccess(update);
      }),
      catchError((error: CreateCheckErrorModel)=> of(new EditCheckFailure(error)))
    ))
  );
  
  @Effect()
  deleteCheck$ = this.actions$.pipe(
    ofType<DeleteCheckRequest>(CreateCheckActions.DeleteCheckRequest),
    mergeMap(action=> this.checksService.deleteCheck(action.check.id).pipe(
      map(res=> {
        this.router.navigateByUrl('/dashboard');
        return new DeleteCheckSuccess(action.check);
      }),
      catchError(err=> of(new DeleteCheckFailure(err)))
    ))
  );

  constructor(
    private actions$: Actions,
    private checksService: ChecksService,
    private router: Router,
    private store: Store<State>
  ) {}
}