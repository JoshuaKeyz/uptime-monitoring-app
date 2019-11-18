import { Action } from '@ngrx/store';
import { RegisterUserModel } from '../domain-models/register-user';

export enum CreateAccountActionTypes {
  RegisterUser = '[RegisterUser] Get Started Btn',
  RegisterUserSuccessful = '[RegisterUserSuccessful] CreateAccountEffects',
  RegisterUserFailed = '[RegisterUserFailed] CreateAccountEffects',
}

export class RegisterUser implements Action {
  readonly type = CreateAccountActionTypes.RegisterUser;

  constructor(public userData: RegisterUserModel) {}
}

export class RegisterUserSuccessful implements Action {
  readonly type = CreateAccountActionTypes.RegisterUserSuccessful;

  // constructor(public userData: RegisterUser) {}
}

export class RegisterUserFailed implements Action {
  readonly type = CreateAccountActionTypes.RegisterUserFailed;

  // constructor(public userData: RegisterUser) {}
}

export type CreateAccountActions = 
  | RegisterUser
  | RegisterUserFailed
  | RegisterUserSuccessful;