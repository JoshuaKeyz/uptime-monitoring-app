import { LoginRequestModel } from '../domain-models/login-request.model';
import { Action } from '@ngrx/store';
import { LoginSuccessModel } from '../domain-models/login-success.model';
import { LoginFailureModel } from '../domain-models/login-failure.model';
import { LogoutRequestModel } from '../domain-models/logout-request.model';
import { LogoutFailureModel } from '../domain-models/logout-failure.model';
import { UpdatedSessionSuccessModel } from '../domain-models/updated-session-success.model';

export enum SessionActionTypes {
  LoginRequest = '[LoginRequest] from LoginComponent or Immediately after SignUp',
  LoginSuccess = '[LoginSuccess] from SessionEffects API',
  LoginFailure = '[LoginFailure] from SessionEffects API',
  LogoutRequest = '[LogoutRequest] from LogoutComponent or from SessionEffects API',
  LogoutSuccess = '[LogoutSuccess] from SessionEffects API',
  LogoutFailure = '[LogoutFailure] from SessionEffects API',
  UpdateSessionRequest = '[UpdateSessionRequest] from AppComponent',
  UpdateSessionSuccess = '[UpdateSessionSuccess] from SessionEffects API',
  UpdateSessionFailure = '[UpdateSessionFailure] from SessionEffects API'
}

export class LoginRequest implements Action {
  readonly type = SessionActionTypes.LoginRequest;
  constructor(public loginRequestModel: LoginRequestModel) { }
}

export class LoginSuccess implements Action {
  readonly type = SessionActionTypes.LoginSuccess;
  constructor(public loginSuccessModel: LoginSuccessModel) { }
}

export class LoginFailure implements Action {
  readonly type = SessionActionTypes.LoginFailure;
  constructor(public loginFailureModel: LoginFailureModel) { }
}

export class LogoutRequest implements Action {
  readonly type = SessionActionTypes.LogoutRequest;
  constructor(public logoutRequestModel: LogoutRequestModel) { }
}

export class LogoutSuccess implements Action {
  readonly type = SessionActionTypes.LogoutSuccess;
}

export class LogoutFailure implements Action {
  readonly type = SessionActionTypes.LogoutFailure;
  constructor(public logoutFailureModel: LogoutFailureModel) { }
}

export class UpdateSessionRequest implements Action {
  readonly type = SessionActionTypes.UpdateSessionRequest;
}

export class UpdateSessionSuccess implements Action {
  readonly type = SessionActionTypes.UpdateSessionSuccess;

  constructor(public updatedToken: UpdatedSessionSuccessModel) { }
}

export class UpdateSessionFailure implements Action {
  readonly type = SessionActionTypes.UpdateSessionFailure;
}

export type SessionActions =
  | LoginRequest
  | LoginFailure
  | LoginSuccess
  | LogoutRequest
  | LogoutSuccess
  | LogoutFailure
  | UpdateSessionFailure
  | UpdateSessionRequest
  | UpdateSessionSuccess;