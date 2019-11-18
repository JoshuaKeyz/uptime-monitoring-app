import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { CreateCheckActions, CreateCheckActionTypes } from './checks.actions';
import { CreateCheckSuccessModel } from '../domain-models/create-check-success.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ChecksState extends EntityState<CreateCheckSuccessModel> {

}
export const checksAdapter = createEntityAdapter<CreateCheckSuccessModel>()

const initialState = checksAdapter.getInitialState();
export const checksReducer = (state = initialState, action: CreateCheckActionTypes): ChecksState=>{
  switch(action.type) {
    case CreateCheckActions.CreateCheckSuccessAction:
      return checksAdapter.addOne(action.checkData, state);
    case CreateCheckActions.GetAllChecksSuccess: 
      return checksAdapter.addAll(action.checks, state);
    case CreateCheckActions.EditCheckSuccess:
      return checksAdapter.updateOne(action.check, state);
    case CreateCheckActions.DeleteCheckSuccess:
      return checksAdapter.removeOne(action.check.id, state);
    default:
      return state;
  }
}

export const checksSelector = createFeatureSelector('checks');

const {selectAll} = checksAdapter.getSelectors();
export const selectAllChecks = createSelector(checksSelector, selectAll);
export const selectById = createSelector(selectAllChecks, (allChecks, props)=> allChecks.find(item=> item.id === props.id))