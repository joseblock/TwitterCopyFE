import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routerActions } from 'react-router-redux';
import { configureStore } from '../../store';
import { PersistGate } from 'redux-persist/integration/react';
import { 
    connectedRouterRedirect,
    connectedReduxRedirect,
} from 'redux-auth-wrapper/history4/redirect';

import './styles.css';

import Login from '../Login';
import Register from '../Register';
import Main from '../Main';
import MainEvents from '../Event';

const routes = [
    {
        path: '/login',
        exact: true,
        component: Login,
    },
    {
        path: '/register',
        exact: true,
        component: Register,
    },
    {
        path: '/main',
        exact: true,
        component: Main,
    },
    {
        path: '/events',
        exact: true,
        component: MainEvents,
    },
];

const { store, persistor } = configureStore();

const App = () => (
    <div className = "App">
        <Provider store = {store}>
            <PersistGate loading = { null } persistor = { persistor }>
                <Router>
                    <Switch>
                        {
                            routes.map( route => (
                                <Route
                                    // exact
                                    key={route.path}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))
                        }
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    </div>
);

export default App;