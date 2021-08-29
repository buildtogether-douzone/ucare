import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute ({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render = {props => 
                window.sessionStorage.getItem('user')?(
                    <Component {...props} />
                ) : ( 
                    <Redirect to={{
                                    pathname: '/', 
                                    state: {from: props.location}
                                  }}
                    />
                )
            }
        />
    )
}