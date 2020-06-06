import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';
import './styles.css'; 
import { Link, Redirect} from 'react-router-dom';

const Login = ({
    onSubmit,
    isLoading,
    isAuthenticated = false,
    error = null,
}) => {
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    if (isAuthenticated === true){
        return (
            <Redirect to = '/main'/>
        )
    }
    return (
        <Fragment>
            <div className = "background">
                <div className = "log-in">
                    <p className = "tittle">
                        TwitterCopy
                    </p>
                    <input 
                        className="input-login"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => changeUsername(e.target.value)}
                    />
                    <input 
                        className="input-login"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => changePassword(e.target.value)}
                    />
                    {
                        isLoading ? (
                            <strong>{'Cargando...'}</strong>
                        ) : ( 
                            <button className = "logInBts" type="submit" onClick={
                                () => onSubmit(username, password)}>
                                {'login'}
                            </button>
                        )
                    }
                    <Link to='/register'>
                        <ul className="registerlink">Register</ul>
                    </Link>
                    {
                        error && (
                            <strong className='error-text'>{ error }</strong>       
                        )
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default connect(
    state => ({
        isLoading: selectors.getIsAuthenticating(state),
        error: selectors.getAuthenticatingError(state),
        isAuthenticated: selectors.isAuthenticated(state),
    }),
    dispatch => ({
        onSubmit(username, password){
            dispatch(actions.startLogin(username, password));
        }
    })
)(Login);