import * as React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/presentation/router/router'
import '@/presentation/styles/global.scss'
import { makeLogin } from '@/main/factories'

ReactDOM.render(
	<Router makeLogin={makeLogin} />,
	document.getElementById('main')
)
