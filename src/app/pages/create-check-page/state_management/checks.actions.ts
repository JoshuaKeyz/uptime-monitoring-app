import { CreateCheckRequestModel } from '../domain-models/create-check-request.model';
import { Action } from '@ngrx/store';
import { CreateCheckSuccessModel } from '../domain-models/create-check-success.model';
import { CreateCheckErrorModel } from '../domain-models/create-check-error.model';
import { Update } from '@ngrx/entity';

export enum CreateCheckActions {
  CreateCheckRequestAction = '[CreateCheckRequestAction] CreateCheckPageComponent',
  CreateCheckSuccessAction = '[CreateCheckSuccessAction] ChecksEffects API',
  CreateCheckFailureAction = '[CreateCheckFailureAction] ChecksEffects API',
  GetAllChecks = '[GetAllChecks] ChecksEffects API',
  GetAllChecksSuccess = '[GetAllChecksSuccess] ChecksEffects API',
  GetAllChecksFailure = '[GetAllChecksFailure] ChecksEffects API',
  EditCheckRequest = '[EditCheckRequest] EditCheckPage component',
  EditCheckSuccess = '[EditCheckSuccess] ChecksEffects API',
  EditCheckFailure = '[EditCheckFailure] ChecksEffects API',
  DeleteCheckRequest = '[DeleteCheckRequest] EditCheckPage component',
  DeleteCheckSuccess = '[DeleteCheckSuccess] ChecksEffects API',
  DeleteCheckFailure = '[DeleteCheckFailure] ChecksEffects API'
}

export class CreateCheckRequest implements Action {
  readonly type = CreateCheckActions.CreateCheckRequestAction;
  constructor(public check: CreateCheckRequestModel) {}
}

export class CreateCheckSuccess implements Action {
  readonly type = CreateCheckActions.CreateCheckSuccessAction;
  constructor(public checkData: CreateCheckSuccessModel) {}
}

export class CreateCheckFailure implements Action {
  readonly type = CreateCheckActions.CreateCheckFailureAction;
  constructor(public error: CreateCheckErrorModel) {}
}

export class GetAllChecks implements Action {
  readonly type = CreateCheckActions.GetAllChecks;
}

export class GetAllChecksSuccess implements Action {
  readonly type = CreateCheckActions.GetAllChecksSuccess;
  constructor(public checks: Array<CreateCheckSuccessModel>) {}
}

export class GetAllChecksFailure implements Action {
  readonly type = CreateCheckActions.GetAllChecksFailure;
  constructor(public error: CreateCheckErrorModel) {}
}

export class EditCheckRequest implements Action {
  readonly type = CreateCheckActions.EditCheckRequest;
  constructor(public check: CreateCheckSuccessModel, public sendRequest: boolean) {}
}

export class EditCheckSuccess implements Action {
  readonly type = CreateCheckActions.EditCheckSuccess;
  constructor(public check: Update<CreateCheckSuccessModel>) {}
}

export class EditCheckFailure implements Action {
  readonly type = CreateCheckActions.EditCheckFailure;
  constructor(public error: CreateCheckErrorModel) {}
}

export class DeleteCheckRequest implements Action {
  readonly type = CreateCheckActions.DeleteCheckRequest;
  constructor(public check: CreateCheckSuccessModel) {}
}

export class DeleteCheckSuccess implements Action {
  readonly type = CreateCheckActions.DeleteCheckSuccess;
  constructor(public check: CreateCheckSuccessModel) {}
}

export class DeleteCheckFailure implements Action {
  readonly type = CreateCheckActions.DeleteCheckFailure;
  constructor(public error: CreateCheckErrorModel) {}
}

export type CreateCheckActionTypes = 
  | CreateCheckRequest
  | CreateCheckFailure
  | CreateCheckSuccess
  | GetAllChecks
  | GetAllChecksSuccess
  | EditCheckFailure
  | EditCheckSuccess
  | EditCheckRequest
  | DeleteCheckFailure
  | DeleteCheckRequest
  | DeleteCheckSuccess;