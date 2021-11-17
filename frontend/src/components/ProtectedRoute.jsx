import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ component: Component, admin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Cookies.get('admin')) {
          console.log(admin);
          return <Component {...rest} {...props} admin={admin} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.string,
  location: PropTypes.object,
};

export default ProtectedRoute;
