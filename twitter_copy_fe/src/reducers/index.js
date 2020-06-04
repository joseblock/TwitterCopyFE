import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth';
import users, * as usersSelectors from './users';
import events, * as eventsSelectors from './events';
import citations, * as citationsSelectors from './citations';
import conversations, * as conversationsSelectors from './conversations';
import messages, * as messagesSelectors from './messages';
import posts, * as postsSelectors from './posts';
import tags, * as tagsSelectors from './tags';
import register, * as registerSelectors from './register';



const reducer = combineReducers({
  auth,
  users,
  events,
  citations,
  conversations,
  messages,
  posts,
  tags,
  register,
});


export default reducer;

export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);

export const getUser = (state, id) => usersSelectors.getUser(state.users, id);
export const getUsers = state => usersSelectors.getUsers(state.users);
export const isFetchingUsers = state => usersSelectors.isFetchingUsers(state.users);
export const getFetchingUsersError = state => usersSelectors.getFetchingUsersError(state.users);

export const getEvent = (state, id) => eventsSelectors.getEvent(state.events, id);
export const getEvents = state => eventsSelectors.getEvents(state.events);
export const isFetchingEvents = state => eventsSelectors.isFetchingEvents(state.events);
export const getFetchingEventError = state => eventsSelectors.getFetchingEventError(state.events);

export const getCitation = (state, id) => citationsSelectors.getCitation(state.citations, id);
export const getCitations = state => citationsSelectors.getCitations(state.citations);
export const isFetchingCitations = state => citationsSelectors.isFetchingCitations(state.citations);
export const getFetchingCitationError = state => citationsSelectors.getFetchingCitationError(state.citations);

export const getConversation = (state, id) => conversationsSelectors.getConversation(state.conversations, id);
export const getConversations = state => conversationsSelectors.getConversations(state.conversations);
export const isFetchingConversations = state => conversationsSelectors.isFetchingConversations(state.conversations);
export const getFetchingConversationError = state => conversationsSelectors.getFetchingConversationError(state.conversations);

export const getMessage = (state, id) => messagesSelectors.getMessage(state.messages, id);
export const getMessages = state => messagesSelectors.getMessages(state.messages);
export const isFetchingMessages = state => messagesSelectors.isFetchingMessages(state.messages);
export const getMessageError = state => messagesSelectors.getMessageError(state.messages);

export const getPost = (state, id) => postsSelectors.getPost(state.posts, id);
export const getPosts = state => postsSelectors.getPosts(state.posts);
export const isFetchingPosts = state => postsSelectors.isFetchingPosts(state.posts);
export const getFetchingPostsError = state => postsSelectors.getFetchingPostsError(state.posts);

export const getTag = (state, id) => tagsSelectors.getTag(state.tags, id);
export const getTags = state => tagsSelectors.getTags(state.tags);
export const isFetchingTags = state => tagsSelectors.isFetchingTags(state.tags);
export const getFetchingTagsError = state => tagsSelectors.getFetchingTagsError(state.tags);

export const getIsRegistering = state => registerSelectors.getIsRegistering(state.register);
export const getRegisterError = state => registerSelectors.getRegisterError(state.register);
