import * as React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/presentation/router/router'
import '@/presentation/styles/global.scss'
import { makeLogin, makeSignUp } from '@/main/factories'

ReactDOM.render(
	<Router makeLogin={makeLogin} makeSignUp={makeSignUp} />,
	document.getElementById('main')
)
