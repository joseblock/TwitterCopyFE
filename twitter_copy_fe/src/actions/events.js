import * as types from '../types/events';


export const startFetchingEvents = () => ({
  type: types.EVENTS_FETCH_STARTED,
});
export const completeFetchingEvents = (entities, order) => ({
  type: types.EVENTS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingEvents = error => ({
  type: types.EVENTS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingEvent = event => ({
  type: types.EVENT_ADD_STARTED,
  payload: event,
});
export const completeAddingEvent = (oldId, event) => ({
  type: types.EVENT_ADD_COMPLETED,
  payload: {
    oldId,
    event,
  },
});
export const failAddingEvent = (oldId, error) => ({
  type: types.EVENT_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingEvent = id => ({
  type: types.EVENT_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingEvent = () => ({
  type: types.EVENT_REMOVE_COMPLETED,
});
export const failRemovingEvent = (id, error) => ({
  type: types.EVENT_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});