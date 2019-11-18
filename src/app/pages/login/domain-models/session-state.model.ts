import { LoginFailureModel } from './login-failure.model';
import { AuthTokenModel } from './auth-token.model';

export interface SessionStateModel {
  isAuth: boolean;
  error: LoginFailureModel;
  processing: boolean;
  authToken: AuthTokenModel
}