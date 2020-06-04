import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css'; 

import Login from '../Login';

import * as actions from '../../actions/auth';
import * as selectors from '../../reducers';
import TokenRefresh from '../TokenRefresh';

const Navbar = ({
    logout,
    isAuthenticated = false,
    authUsername = '',
}) => (
    <div className="navbar">
        <Fragment> 
            {/* {
                isAuthenticated ?( */}
                    <>
                        <TokenRefresh reviewTime={10000}/>
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
);

export default connect(
    (state) => ({
        isAuthenticated: selectors.isAuthenticated(state),
        authUsername: selectors.getAuthUsername(state),
    }),
    dispatch => ({
        logout(){
            dispatch(actions.logout());
        }
    })
)(Navbar);