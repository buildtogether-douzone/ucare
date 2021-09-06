import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute ({ component: Component, role ,...rest}) {
    return (
        <Route
            {...rest}
            render = {props =>
                role != null ?
                !!sessionStorage.getItem('user') && sessionStorage.getItem('role') == role ?(
                    <Component {...props} />
                ) : ( 
                    <Redirect to={{
                                    pathname: (sessionStorage.getItem('role') == '의사' ? '/doctor/main' : 
                                               sessionStorage.getItem('role') == '관리자' ? '/admin/main' :
                                               sessionStorage.getItem('role') == '간호사' && '/nurse/main'), 
                                    state: {from: props.location}
                                  }}
                    />
                ) : 
                !!sessionStorage.getItem('user')?(
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