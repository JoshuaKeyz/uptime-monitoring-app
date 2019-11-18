import { SessionStateModel } from '../domain-models/session-state.model';
import { SessionActions, SessionActionTypes } from './session.actions';

const initialState: SessionStateModel = {
  processing: false,
  isAuth: false,
  authToken: undefined,
  error: undefined
}

export function sessionReducer(state = initialState, action: SessionActions): SessionStateModel {
  switch (action.type) {
    case SessionActionTypes.LogoutRequest:
    case SessionActionTypes.LoginRequest:
      return {
        ...state,
        processing: true
      }
    case SessionActionTypes.LoginFailure:
      return {
        ...state,
        processing: false,
        isAuth: false,
        error: action.loginFailureModel
      }
    case SessionActionTypes.LoginSuccess:
      return {
        ...state,
        isAuth: true,
        processing: false,
        authToken: action.loginSuccessModel.tokenObj,
        error: null
      }
    case SessionActionTypes.LogoutSuccess:
      return {
        ...state,
        isAuth: false,
        processing: false,
        authToken: undefined,
        error: null
      }
    case SessionActionTypes.LogoutFailure:
      return {
        ...state, 
        processing: false,
        isAuth: false,
        error: action.logoutFailureModel
      }
    case SessionActionTypes.UpdateSessionSuccess:
      return {
        ...state,
        authToken: action.updatedToken
      }
    default:
      return state;
  }
}