import {
    call,
    takeEvery,
    put,
    delay,
    select,
} from 'redux-saga/effects';

import * as selectors from '../reducers';
import * as actions from '../actions/register';
import * as types from '../types/register';

import * as http from '../utils/http';

import {
    API_BASE_URL,
} from '../settings';


function* register(action){
    try{
        const userResponse = yield call(
            fetch,
            `${API_BASE_URL}/users/`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers:{
                'Content-Type': 'application/json',
                },
            },
        );
        console.log(userResponse);
        if(http.isSuccessful(userResponse.status)){
            const jsonResult = yield userResponse.json();
            yield put(actions.completeRegister());
        } else {
            const {non_field_errors} = yield userResponse.json();
            yield put(actions.failRegister(non_field_errors[0]));
        }

    } catch (error) {
        yield put(actions.failRegister('Connection failed!'));
    }
};


export function* watchRegisterStarted() {
    yield takeEvery(
        types.REGISTER_STARTED,
        register,
    );
}
