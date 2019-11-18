import { Action } from '@ngrx/store';
import { UserModel } from '../domain-models/user.model';
import { ServerErrorModel } from '../domain-models/server-error.model';

export enum UserActionTypes {
  GetUserRequest = '[GetUserRequest] AccountSettingsPage Component',
  GetUserSuccess = '[GetUserSuccess]',
  GetUserFailure = '[GetUserFailure]',
  UpdateUserNameRequest = '[UpdateUserNameRequest]',
  UpdateUserNameSuccess = '[UpdateUserNameSuccess]',
  UpdateUserNameFailure = '[UpdateuserNameFailure]',
  UpdateUserPasswordRequest = '[UpdateUserPasswordRequest]',
  UpdateUserPasswordSuccess = '[UpdateUserPasswordSuccess]',
  UpdateUserPasswordFailure = '[UpdateUserPasswordFailure]',
  DeleteUserRequest = '[DeleteUserRequest]',
  DeleteUserSuccess = '[DeleteUserSuccess]',
  DeleteUserFailure = '[DeleteUserFailure]'
};

export class GetUserRequest implements Action {
  readonly type = UserActionTypes.GetUserRequest;
  // constructor(public phone: string) {}
};

export class GetUserSucess implements Action {
  readonly type = UserActionTypes.GetUserSuccess;
  constructor(public user: UserModel) {}
}

export class GetUserFailure implements Action {
  readonly type = UserActionTypes.GetUserFailure;
  constructor(public error: ServerErrorModel) {}
}

export class UpdateUserNameRequest implements Action {
  readonly type = UserActionTypes.UpdateUserNameRequest;
  constructor(public user: UserModel) {}
}

export class UpdateUserNameSuccess implements Action {
  readonly type = UserActionTypes.UpdateUserNameSuccess;
  constructor(public user: UserModel) {}
}

export class UpdateUserNameFailure implements Action {
  readonly type = UserActionTypes.UpdateUserNameFailure;
  constructor(public error: ServerErrorModel) {}
}

export class UpdateUserPasswordRequest implements Action {
  readonly type = UserActionTypes.UpdateUserPasswordRequest;
  constructor(public password: string) {}
}

export class UpdateUserPasswordSuccess implements Action {
  readonly type = UserActionTypes.UpdateUserPasswordSuccess;
}

export class UpdateUserPasswordFailure implements Action {
  readonly type = UserActionTypes.UpdateUserPasswordFailure;
  constructor(public error: ServerErrorModel) {}
}
export class DeleteUserRequest implements Action {
  readonly type = UserActionTypes.DeleteUserRequest;
  constructor(public id: string) {}
}
export class DeleteUserSuccess implements Action {
  readonly type = UserActionTypes.DeleteUserSuccess;
}
export class DeleteUserFailure implements Action {
  readonly type = UserActionTypes.DeleteUserFailure;
  constructor(public error: ServerErrorModel) {}
}
export type UserActions = 
  | GetUserRequest
  | GetUserSucess
  | GetUserFailure
  | UpdateUserNameRequest
  | UpdateUserNameSuccess
  | UpdateUserNameFailure
  | UpdateUserPasswordRequest
  | UpdateUserPasswordSuccess
  | UpdateUserPasswordFailure;