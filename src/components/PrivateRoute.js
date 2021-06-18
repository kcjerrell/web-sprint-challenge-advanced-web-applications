//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { hasToken } from '../helpers/axiosWithAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return <Route {...rest} render={(props) => {
		if (hasToken()) {
			return (<Component {...props} />);
		} else {
			return <Redirect to="/login" />
		}
	}} />
}

export default PrivateRoute;
