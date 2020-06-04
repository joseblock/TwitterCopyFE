import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/tags';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.TAGS_FETCH_COMPLETED: {
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
    case types.TAG_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.TAG_ADD_COMPLETED: {
      const { oldId, Tag } = action.payload;
      const newState = omit(state, oldId);
      newState[Tag.id] = {
        ...Tag,
        isConfirmed: true,
      };
      return newState;
    }
    case types.TAG_REMOVE_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.TAGS_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    case types.TAG_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.TAG_ADD_COMPLETED: {
      const { oldId, Tag } = action.payload;
      return state.map(id => id === oldId ? Tag.id : id);
    }
    case types.TAG_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.TAGS_FETCH_STARTED: {
      return true;
    }
    case types.TAGS_FETCH_COMPLETED: {
      return false;
    }
    case types.TAGS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.TAGS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.TAGS_FETCH_STARTED: {
      return null;
    }
    case types.TAGS_FETCH_COMPLETED: {
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

export const getTag = (state, id) => state.byId[id];
export const getTags = state => state.order.map(id => getTag(state, id));
export const isFetchingTags = state => state.isFetching;
export const getFetchingTagsError = state => state.error;
