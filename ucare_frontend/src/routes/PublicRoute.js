import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute ({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render = {props => 
                !!window.sessionStorage.getItem('user')? (
                    <Redirect to={{
                        pathname: '/Home', 
                        state: {from: props.location}
                      }}
                    />
                ) : ( 
                    <Component {...props} />
                )
            }
        />
    )
}