import {combineReducers} from 'redux';

import * as types from '../types/register';

const isRegistering = (state=false, action) => {
  switch (action.type) {
    case types.REGISTER_STARTED: {
        return true;
    }
    case types.REGISTER_COMPLETED: {
        return false;
    }
    case types.REGISTER_FAILED: {
      return false;
    }
  }
  return state;
};

const error = (state=null, action) => {
  switch (action.type){
    case types.REGISTER_STARTED: {
      return null;
    }
    case types.REGISTER_COMPLETED: {
      return null;
    }
    case types.REGISTER_FAILED: {
      return action.payload.error;
    }
  }
  return state;
};

const register = combineReducers({
  isRegistering,
  error,
})

export default register;


export const getIsRegistering = state => state.isRegistering;
export const getRegisterError = state => state.error;