import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalState';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    const { token } = useContext(GlobalContext);

    return(
        <Route
            {...rest}
            render = {props =>
                token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default PrivateRoute;