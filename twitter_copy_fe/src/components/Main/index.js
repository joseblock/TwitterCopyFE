import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import * as actions from '../../actions/posts';
import './styles.css'; 
import Navbar from '../Navbar';
import { Link, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Posts from '../Posts';

const Main = ({
    onSubmit,
    onClick,
    user,
    isAuthenticated = true,
}) => {
        const [content, changeContent] = useState('');
        if (isAuthenticated === false){
            return(
                <Redirect to = '/login'/>
            )
        }
        return (
            <Fragment>
                <Navbar/>
                <div className= "mainCenter">
                    <div className= "postmaking-container">
                        <div className = "post">
                            <p>
                                <input 
                                    className="input-login"
                                    type="text"
                                    placeholder="En que piensas?"
                                    value={content}
                                    onChange={e => changeContent(e.target.value)}
                                />
                            </p>
                        </div>
                        <button className = "postear" type="submit" onClick={
                            () => onSubmit(user, content)}>
                            {'Publicar'}
                        </button>
                    </div>
                    <Posts/>
                </div>
            </Fragment>
        );
};

export default connect(
    state => ({
        isAuthenticated: selectors.isAuthenticated(state),
        user: selectors.getAuthUserID(state),
    }),
    dispatch => ({
        onSubmit(user, content){
            dispatch(actions.startAddingPost({
                id: uuidv4(),
                user,
                content,
            }))
        }
    })
)(Main);