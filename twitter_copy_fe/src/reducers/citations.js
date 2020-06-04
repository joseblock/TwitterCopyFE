import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/citations';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.CITATIONS_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });

      return newState;
    }
    case types.CITATION_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.CITATION_ADD_COMPLETED: {
      const { oldId, Citation } = action.payload;
      const newState = omit(state, oldId);
      newState[Citation.id] = {
        ...Citation,
        isConfirmed: true,
      };
      return newState;
    }
    case types.CITATION_REMOVE_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.CITATIONS_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    case types.CITATION_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.CITATION_ADD_COMPLETED: {
      const { oldId, Citation } = action.payload;
      return state.map(id => id === oldId ? Citation.id : id);
    }
    case types.CITATION_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.CITATIONS_FETCH_STARTED: {
      return true;
    }
    case types.CITATIONS_FETCH_COMPLETED: {
      return false;
    }
    case types.CITATIONS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.CITATIONS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.CITATIONS_FETCH_STARTED: {
      return null;
    }
    case types.CITATIONS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  byId,
  order,
  isFetching,
  error,
});

export const getCitation = (state, id) => state.byId[id];
export const getCitations = state => state.order.map(id => getCitation(state, id));
export const isFetchingCitations = state => state.isFetching;
export const getFetchingCitationError = state => state.error;
