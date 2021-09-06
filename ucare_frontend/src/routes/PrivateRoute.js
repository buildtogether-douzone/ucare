import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute ({ component: Component, role ,...rest}) {
    console.log(sessionStorage.getItem('role') == role) 
    return (
        <Route
            {...rest}
            render = {props =>
                role != null ?
                sessionStorage.getItem('user') && sessionStorage.getItem('role') == role ?(
                    <Component {...props} />
                ) : ( 
                    <Redirect to={{
                                    pathname: '/', 
                                    state: {from: props.location}
                                  }}
                    />
                ) : 
                sessionStorage.getItem('user')?(
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