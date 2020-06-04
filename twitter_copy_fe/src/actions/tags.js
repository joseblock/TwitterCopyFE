import * as types from '../types/tags';


export const startFetchingTags = () => ({
  type: types.TAGS_FETCH_STARTED,
});
export const completeFetchingTags = (entities, order) => ({
  type: types.TAGS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingTags = error => ({
  type: types.TAGS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingTag = tag => ({
  type: types.TAG_ADD_STARTED,
  payload: tag,
});
export const completeAddingTag = (oldId, tag) => ({
  type: types.TAG_ADD_COMPLETED,
  payload: {
    oldId,
    tag,
  },
});
export const failAddingTag = (oldId, error) => ({
  type: types.TAG_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingTag = id => ({
  type: types.TAG_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingTag = () => ({
  type: types.TAG_REMOVE_COMPLETED,
});
export const failRemovingTag = (id, error) => ({
  type: types.TAG_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});