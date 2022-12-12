import React from 'react'
import { Redirect, RouteProps, Route } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
	return <Route {...props} component={() => <Redirect to='/login' />} />
}
 
export default PrivateRoute
