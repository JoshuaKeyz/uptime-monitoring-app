import { UserActions, GetUserSucess, UserActionTypes } from './users.actions';

export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  _id: string;
}
const initialState: User = {firstName: undefined, lastName: undefined, phone: undefined,_id: undefined}
export const userReducer = (state = initialState, action: UserActions): User => {
  switch(action.type) {
    case UserActionTypes.GetUserSuccess:
      return {
        ...state,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        phone: action.user.phone,
        _id: action.user._id
      };
    case UserActionTypes.UpdateUserNameSuccess:
      return {
        ...state,
        firstName: action.user.firstName,
        lastName: action.user.lastName
      };
    default:
      return state;
  }
}