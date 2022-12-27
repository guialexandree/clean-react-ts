import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'
import { makeLogin, makeSignUp, makeSurveyList, makeSurveyResult } from '@/main/factories'
import { ApiContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'
import { SurveyResult } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
		<ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter, getCurrentAccount: getCurrentAccountAdapter }}>
			<BrowserRouter>
				<Switch>
					<Route path='/login' exact component={makeLogin} />
					<Route path='/signup' exact component={makeSignUp} />
					<PrivateRoute path='/' exact component={makeSurveyList} />
					<Route path='/surveys/:id' component={makeSurveyResult} />
				</Switch>
			</BrowserRouter>
		</ApiContext.Provider>
  )
}

export default Router
