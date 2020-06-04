import * as types from '../types/citations';


export const startFetchingCitations = () => ({
  type: types.CITATIONS_FETCH_STARTED,
});
export const completeFetchingCitations = (entities, order) => ({
  type: types.CITATIONS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingCitations = error => ({
  type: types.CITATIONS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingCitation = citation => ({
  type: types.CITATION_ADD_STARTED,
  payload: citation,
});
export const completeAddingCitation = (oldId, citation) => ({
  type: types.CITATION_ADD_COMPLETED,
  payload: {
    oldId,
    citation,
  },
});
export const failAddingCitation = (oldId, error) => ({
  type: types.CITATION_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingCitation = id => ({
  type: types.CITATION_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingCitation = () => ({
  type: types.CITATION_REMOVE_COMPLETED,
});
export const failRemovingCitation = (id, error) => ({
  type: types.CITATION_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});