import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/posts';
import PostRow from '../PostRow';


const PostList = ({ posts, isLoading, onLoad }) => {
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
          <table>
            <tbody>
              {
                posts.map(({ id }) => <PostRow key={id} id={id} />)
              }
            </tbody>
          </table>
        )
      }
    </Fragment>
  );
};

export default connect(
  state => ({
    posts: selectors.getPost(state),
    isLoading: selectors.isFetchingPosts(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingPosts());
    },
  }),
)(PostList);
