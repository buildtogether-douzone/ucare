import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute ({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render = {props => 
                !!window.sessionStorage.getItem('user')? (
                    <Redirect to={{
                        pathname: (sessionStorage.getItem('role') == '의사' ? '/doctor/main' : 
                                   sessionStorage.getItem('role') == '관리자 ' ? '/admin/main' :
                                   sessionStorage.getItem('role') == '간호사' && '/nurse/main'), 
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