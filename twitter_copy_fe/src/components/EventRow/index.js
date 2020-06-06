import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';


const EventRow = ({ 
    event, 
    state,
}) => {
  const user = selectors.getUser(state, event.user)
  return(
    <div className="posts">
      <div className="postUser">
          <div>{user.username}</div>
      </div>
      <div className="postCotent">
          <div>{ event.ubication }</div>
      </div>
      <div className="postCotent">
          <div>{ event.description }</div>
      </div>
    </div>
  )
};

export default connect(
  (state, {id}) => ({
    event: selectors.getEvent(state, id),
    state: state
  }),
  (dispatch, { id }) => ({
    onDelete() {
      dispatch(actions.startRemovingEvent(id));
    }
  }),
)(EventRow);