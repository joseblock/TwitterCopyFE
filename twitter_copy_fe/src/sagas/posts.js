import {
    call,
    takeEvery,
    select,
    put,
}from 'redux-saga/effects';

import * as types from '../types/posts';
import * as actions from '../actions/posts';
import * as selectors from '../reducers';
import { normalize } from 'normalizr';
import * as http from '../utils/http';
import * as schemas from './../schemas/posts'
import {
    API_BASE_URL,
} from '../settings';

function* fetchPosts(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/posts/`,
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
                    entities:{posts},
                    result,
                } = normalize(jsonResult, schemas.posts);
                yield put(actions.completeFetchingPosts(posts, result));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failFetchingPosts(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failFetchingPosts('Connection failed!'))
    }

}
export function* watchFetchPosts(){
    yield takeEvery(
        types.POSTS_FETCH_STARTED,
        fetchPosts,
    )
}

function* addPost(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/posts/`,
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
                yield put(actions.completeAddingPost(
                    action.payload.Post.id, 
                    jsonResult,
                    ));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failAddingPost(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failAddingPost('Connection failed!'))
    }
}

export function* watchAddPost(){
    yield takeEvery(
        types.POST_ADD_STARTED,
        addPost,
    )
}

function* removePost(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/posts/${action.payload.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if(http.isSuccessful(response.status)){
                yield put(actions.completeRemovingPost());
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failRemovingPost(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failRemovingPost('Connection failed!'))
    }
}

export function* watchRemovePost(){
    yield takeEvery(
        types.POST_REMOVE_STARTED,
        removePost,
    )
}