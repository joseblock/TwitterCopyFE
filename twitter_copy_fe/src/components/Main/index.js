import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import * as actions from '../../actions/posts';
import './styles.css'; 
import Navbar from '../Navbar';
import { Link, Redirect } from 'react-router-dom';
// import Posts from '../Posts'

const Main = ({
    onSubmit,
    onClick,
    isAuthenticated = true,}) => {
        const [post, changePost] = useState('');
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
                                    value={post}
                                    onChange={e => changePost(e.target.value)}
                                />
                            </p>
                        </div>
                        <button className = "postear" type="submit" onClick={
                            () => onSubmit()}>
                            {'Publicar'}
                        </button>
                    </div>
                    <div className="posts">
                    </div>
                </div>
            </Fragment>
        );
};

export default connect(
    state => ({
        isAuthenticated: selectors.isAuthenticated(state),
    }),
    dispatch => ({
        onSubmit(){
            
        }
    })
)(Main);