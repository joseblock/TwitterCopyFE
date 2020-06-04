import {
    call,
    takeEvery,
    select,
    put,
}from 'redux-saga/effects';

import * as types from '../types/citations';
import * as actions from '../actions/citations';
import * as selectors from '../reducers';
import { normalize } from 'normalizr';
import * as http from '../utils/http';
import * as schemas from './../schemas/citations'
import {
    API_BASE_URL,
} from '../settings';

function* fetchCitations(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/citations/`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            //Lo obtuve de tutos
            if(http.isSuccessful(response.status)){
                const jsonResult = yield response.json();
                const {
                    entities:{citations},
                    result,
                } = normalize(jsonResult, schemas.citations);
                yield put(actions.completeFetchingCitations(citations, result));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failFetchingCitations(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failFetchingCitations('Connection failed!'))
    }

}
export function* watchFetchCitations(){
    yield takeEvery(
        types.CITATIONS_FETCH_STARTED,
        fetchCitations,
    )
}

function* addCitation(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/citations/`,
                {
                    method: 'POST',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if(http.isSuccessful(response.status)){
                const jsonResult = yield response.json();
                yield put(actions.completeAddingCitation(
                    action.payload.Citation.id, 
                    jsonResult,
                    ));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failAddingCitation(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failAddingCitation('Connection failed!'))
    }
}

export function* watchAddCitation(){
    yield takeEvery(
        types.CITATION_ADD_STARTED,
        addCitation,
    )
}

function* removeCitation(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/citations/${action.payload.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if(http.isSuccessful(response.status)){
                yield put(actions.completeRemovingCitation());
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failRemovingCitation(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failRemovingCitation('Connection failed!'))
    }
}

export function* watchRemoveCitation(){
    yield takeEvery(
        types.CITATION_REMOVE_STARTED,
        removeCitation,
    )
}