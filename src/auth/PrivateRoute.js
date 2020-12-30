import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticate } from './index'


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => isAuthenticate() ? (
            <Component {...rest} />
        ) : (
                <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
            )} />
    );
}

export default PrivateRoute;