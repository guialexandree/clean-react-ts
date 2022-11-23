import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from '@/presentation/pages'

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />
	}
])
 
const Router: React.FC = () => {
	return (  
		<RouterProvider router={router} />
	)
}
 
export default Router