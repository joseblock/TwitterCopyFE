import {
    call,
    takeEvery,
    select,
    put,
}from 'redux-saga/effects';

import * as types from '../types/users';
import * as actions from '../actions/users';
import * as selectors from '../reducers';
import { normalize } from 'normalizr';
import * as http from '../utils/http';
import * as schemas from './../schemas/users'
import {
    API_BASE_URL,
} from '../settings';

function* fetchUsers(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/users/`,
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
                    entities:{users},
                    result,
                } = normalize(jsonResult, schemas.users);
                yield put(actions.completeFetchingUsers(users, result));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failFetchingUsers(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failFetchingUsers('Connection failed!'))
    }

}
export function* watchFetchUsers(){
    yield takeEvery(
        types.USERS_FETCH_STARTED,
        fetchUsers,
    )
}

function* addUser(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/users/`,
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
                yield put(actions.completeAddingUser(
                    action.payload.User.id, 
                    jsonResult,
                    ));
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failAddingUser(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failAddingUser('Connection failed!'))
    }
}

export function* watchAddUser(){
    yield takeEvery(
        types.USER_ADD_STARTED,
        addUser,
    )
}

function* removeUser(action){
    try{
        const isAuth = yield select(selectors.isAuthenticated)
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/users/${action.payload.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    }
                }
            )
            if(http.isSuccessful(response.status)){
                yield put(actions.completeRemovingUser());
            }else{
                const {non_field_errors} = yield response.json;
                yield put(actions.failRemovingUser(non_field_errors[0]));
            }
        }
    } catch (error){
        yield put(actions.failRemovingUser('Connection failed!'))
    }
}

export function* watchRemoveUser(){
    yield takeEvery(
        types.USER_REMOVE_STARTED,
        removeUser,
    )
}