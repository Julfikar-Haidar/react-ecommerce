import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticate } from './index'


const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={props => isAuthenticate() && isAuthenticate().user.role === 1 ? (

                <Component {...rest} />

            ) : (

                    <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />

                )} />
    );
}

export default AdminRoute;