import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/posts';


const PostRow = ({ 
    post, 
}) => {
  // const user = selectors.getUser(poststate, post.user)
  console.log(post);
  return(
    <div className="posts">
      <div className="postUser">
          <div>{post.user}</div>
      </div>
      <div className="postCotent">
          <div>{ post.content }</div>
      </div>
    </div>
  )
};

export default connect(
  (state, {id}) => ({
    post: selectors.getPost(state, id),
  }),
  (dispatch, { id }) => ({
    onDelete() {
      dispatch(actions.startRemovingPost(id));
    }
  }),
)(PostRow);