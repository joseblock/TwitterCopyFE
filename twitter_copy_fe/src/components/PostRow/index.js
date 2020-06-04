import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/posts';


const PostRow = ({ 
    username, 
    onDelete, 
    isConfirmed = false 
}) => (
    <tr className={!isConfirmed ? 'post' : ''}>
        <td>{ username }</td>
    </tr>
    <tr className={!isConfirmed ? 'post' : ''}>
        <td>
            {
                isConfirmed && (
                <button
                    onClick={onDelete}
                >
                    {'Borrar'}
                </button>
                )
            }
        </td>
    </tr>

);

export default connect(
  (state, { id }) => ({
    ...selectors.getPost(state, id),
  }),
  (dispatch, { id }) => ({
    onDelete() {
      dispatch(actions.startRemovingPost(id));
    }
  }),
)(PostRow);