import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/posts';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.POSTS_FETCH_COMPLETED: {
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
    case types.POST_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.POST_ADD_COMPLETED: {
      const { oldId, Post } = action.payload;
      const newState = omit(state, oldId);
      newState[Post.id] = {
        ...Post,
        isConfirmed: true,
      };
      return newState;
    }
    case types.POST_REMOVE_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.POSTS_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    case types.POST_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.POST_ADD_COMPLETED: {
      const { oldId, Post } = action.payload;
      return state.map(id => id === oldId ? Post.id : id);
    }
    case types.POST_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.POSTS_FETCH_STARTED: {
      return true;
    }
    case types.POSTS_FETCH_COMPLETED: {
      return false;
    }
    case types.POSTS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.POSTS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.POSTS_FETCH_STARTED: {
      return null;
    }
    case types.POSTS_FETCH_COMPLETED: {
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

export const getPost = (state, id) => state.byId[id];
export const getPosts = state => state.order.map(id => getPost(state, id));
export const isFetchingPosts = state => state.isFetching;
export const getFetchingPostsError = state => state.error;
