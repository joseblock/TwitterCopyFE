import {
    call,
    takeEvery,
    select,
    put,
}from 'redux-saga/effects';

import * as types from '../types/tags';
import * as actions from '../actions/tags';
import * as selectors from '../reducers';
import { normalize } from 'normalizr';
import * as http from '../utils/http';
import * as schemas from './../schemas/tags'
import {
    API_BASE_URL,
} from '../settings';

function* fetchTags(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/tags/`,
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
                    entities:{tags},
                    result,
                } = normalize(jsonResult, schemas.tags);
                yield put(actions.completeFetchingTag(tags, result));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failFetchingTag(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failFetchingTag('Connection failed!'))
    }

}
export function* watchFetchTags(){
    yield takeEvery(
        types.TAGS_FETCH_STARTED,
        fetchTags,
    )
}

function* addTag(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/tags/`,
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
                yield put(actions.completeAddingTag(
                    action.payload.Tag.id, 
                    jsonResult,
                    ));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failAddingTag(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failAddingTag('Connection failed!'))
    }
}

export function* watchAddTag(){
    yield takeEvery(
        types.TAG_ADD_STARTED,
        addTag,
    )
}

function* removeTag(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/tags/${action.payload.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if(http.isSuccessful(response.status)){
                yield put(actions.completeRemovingTag());
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failRemovingTag(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failRemovingTag('Connection failed!'))
    }
}

export function* watchRemoveTag(){
    yield takeEvery(
        types.TAG_REMOVE_STARTED,
        removeTag,
    )
}