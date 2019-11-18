import { CreateAccountState } from '../domain-models/create-account-state';
import { CreateAccountActions, CreateAccountActionTypes } from './create-account.actions';

export const initialState: CreateAccountState = {
  processing: false,
  error: undefined,
  status: undefined
}

export function createAccountReducer(state = initialState, action: CreateAccountActions): CreateAccountState {
  switch(action.type) {
    case CreateAccountActionTypes.RegisterUser: {
      return {
        ...state,
        processing: true
      }
    }
    default: 
      return state;
  }
}