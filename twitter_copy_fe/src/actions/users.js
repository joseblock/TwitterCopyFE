
import * as types from '../types/users';


export const startFetchingUsers = () => ({
  type: types.USERS_FETCH_STARTED,
});
export const completeFetchingUsers = (entities, order) => ({
  type: types.USERS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingUsers = error => ({
  type: types.USERS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingUser = user => ({
  type: types.USER_ADD_STARTED,
  payload: user,
});
export const completeAddingUser = (oldId, user) => ({
  type: types.USER_ADD_COMPLETED,
  payload: {
    oldId,
    user,
  },
});
export const failAddingUser = (oldId, error) => ({
  type: types.USER_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingUser = id => ({
  type: types.USER_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingUser = () => ({
  type: types.USER_REMOVE_COMPLETED,
});
export const failRemovingUser = (id, error) => ({
  type: types.USER_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});