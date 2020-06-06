import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/posts';
import PostRow from '../PostRow';
import './styles.css';

const Posts = ({ 
  posts,
  isLoading, 
  onLoad 
}) => {
  useEffect(onLoad, []);
  return (
    <Fragment>
      {
        posts.length === 0 && !isLoading && (
          <p>{'No hay Posts publicados'}</p>
        )
      }
      {
        isLoading && (
          <p>{'Cargando...'}</p>
        )
      }
      {
        posts.length > 0 && !isLoading && (
          <div>
            <div>
              {
                posts.map(({ id }) => <PostRow key={id} id={id} />)
              }
            </div>
          </div>
        )
      }
    </Fragment>
  );
};

export default connect(
  state => ({
    posts: selectors.getPosts(state),
    isLoading: selectors.isFetchingPosts(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingPosts());
    },
  }),
)(Posts);
