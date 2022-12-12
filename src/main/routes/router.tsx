import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeSignUp } from '@/main/factories'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '@/main/adapters'

const Router: React.FC = () => {
  return (
		<ApiContext.Provider value={{ setCurrentAccount:setCurrentAccountAdapter }}>
			<BrowserRouter>
				<Switch>
					<Route path='/login' exact component={makeLogin} />
					<Route path='/signup' exact component={makeSignUp} />
					<Route path='/' exact component={SurveyList} />
				</Switch>
			</BrowserRouter>
		</ApiContext.Provider>
  )
}

export default Router
