import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { CreateAccountState } from '../pages/create-account-page/domain-models/create-account-state';
import { createAccountReducer } from '../pages/create-account-page/state_management/create-account.reducer';
import { SessionStateModel } from '../pages/login/domain-models/session-state.model';
import { sessionReducer } from '../pages/login/state_management/session.reducer';
import { ChecksState, checksReducer } from '../pages/create-check-page/state_management/checks.reducer';
import { User, userReducer } from '../pages/account-settings-page/state_management/users.reducer';


export interface State {
  accountCreation: CreateAccountState;
  session: SessionStateModel,
  checks: ChecksState,
  user: User
}

export const reducers: ActionReducerMap<State> = {
  accountCreation: createAccountReducer,
  session: sessionReducer,
  checks: checksReducer,
  user: userReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
