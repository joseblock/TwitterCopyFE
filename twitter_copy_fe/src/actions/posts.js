import * as types from '../types/posts';


export const startFetchingPosts = () => ({
  type: types.POSTS_FETCH_STARTED,
});
export const completeFetchingPosts = (entities, order) => ({
  type: types.POSTS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingPosts = error => ({
  type: types.POSTS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingPost = post => ({
  type: types.POST_ADD_STARTED,
  payload: post
});
export const completeAddingPost = (oldId, post) => ({
  type: types.POST_ADD_COMPLETED,
  payload: {
    oldId,
    post,
  },
});
export const failAddingPost = (oldId, error) => ({
  type: types.POST_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingPost = id => ({
  type: types.POST_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingPost = () => ({
  type: types.POST_REMOVE_COMPLETED,
});
export const failRemovingPost = (id, error) => ({
  type: types.POST_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});