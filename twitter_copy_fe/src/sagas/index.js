import { fork, all } from 'redux-saga/effects';
import {
    watchLoginStarted,
    watchRefreshTokenStarted,
} from './auth';

import {
    watchFetchUsers,
    watchAddUser,
    watchRemoveUser,
} from './users';

import {
    watchFetchPosts,
    watchAddPost,
    watchRemovePost,
} from './posts';

import {
    watchFetchConversations,
    watchAddConversation,
    watchRemoveConversation,
} from './conversations';
  
import {
    watchFetchMessages,
    watchAddMessage,
    watchRemoveMessage,
} from './messages';

import {
    watchFetchCitations,
    watchAddCitation,
    watchRemoveCitation,
} from './citations';

import {
    watchFetchEvents,
    watchAddEvent,
    watchRemoveEvent,
} from './events';

import{
    watchRegisterStarted,
}from './register'

function* mainSaga(){
    yield all([
        fork(watchLoginStarted),
        fork(watchRefreshTokenStarted),
        fork(watchFetchUsers),
        fork(watchAddUser),
        fork(watchRemoveUser),
        fork(watchFetchPosts),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchFetchConversations),
        fork(watchAddConversation),
        fork(watchRemoveConversation),
        fork(watchFetchMessages),
        fork(watchAddMessage),
        fork(watchRemoveMessage),
        fork(watchFetchCitations),
        fork(watchAddCitation),
        fork(watchRemoveCitation),
        fork(watchFetchEvents),
        fork(watchAddEvent),
        fork(watchRemoveEvent),
        fork(watchRegisterStarted),
    ])
}

export default mainSaga;