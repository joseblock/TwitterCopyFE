import * as types from '../types/register';

export const startRegister = (user) => ({
  type: types.REGISTER_STARTED,
  payload: user,
});

export const completeRegister = () => ({
  type: types.REGISTER_COMPLETED,
});

export const failRegister = error => ({
  type: types.REGISTER_FAILED,
  payload: {error},
});