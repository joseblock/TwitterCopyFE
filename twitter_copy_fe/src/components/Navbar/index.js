import React,{Fragment, useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import Login from '../Login';

import * as actions from '../../actions/auth';
import * as selectors from '../../reducers';
import TokenRefresh from '../TokenRefresh';

const Navbar = ({
    onSubmit,
    logout,
    isAuthenticated = true,
    authUsername = '',
}) => {
    const [search, changeSearch] = useState('');
    return (
        <div className="navbar">
            <Fragment> 
                {/* {
                    isAuthenticated ?( */}
                        <>
                            <TokenRefresh reviewTime={100000}/>
                            <Link to='/main'>
                                <a className="navbar-text"> TwitterCopy </a>
                            </Link>
                            <div className= "buscador-container">
                                <button className = "buscar" type="submit" onClick={
                                    () => onSubmit()}>
                                    {'Buscar'}
                                </button>
                                <div className = "buscador">   
                                    <input 
                                        className="input-search"
                                        type="text"
                                        placeholder="Buscar..."
                                        value={search}
                                        onChange={e => changeSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Link to='/messages'>
                                <a className="navbar-text"> Messages </a>
                            </Link>
                            <Link to='/events'>
                                <a className="navbar-text"> Events </a>
                            </Link>
                            <div className='div-display-row'>
                                <div className='div-display-column'>
                                    <h5 className='navbar-username'>{ authUsername }</h5>
                                </div>
                                <button className="logout-button" type="submit"
                                    onClick = {() => logout()}>
                                    {'Logout'}
                                </button>
                            </div>
                        </>
                    {/* )
                } */}
            </Fragment>
        </div>
    )

}

export default connect(
    (state) => ({
        isAuthenticated: selectors.isAuthenticated(state),
        authUsername: selectors.getAuthUsername(state),
    }),
    dispatch => ({
        logout(){
            dispatch(actions.logout());
        },
        onSubmit(){
            dispatch()
        }
    })
)(Navbar);