import React, { useState } from 'react'
import S from './login-styles.scss'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: '',
		emailError: 'Campo Obrigatório',
		passwordError: 'Campo Obrigatório'
  })

  return (
		<section className={S.login}>
			<Header />
			<Context.Provider value={state}>
				<form className={S.form} action="">
					<h2>Login</h2>
					<Input type="email" name="email" placeholder="Digite seu e-mail" />
					<Input type="password" name="password" placeholder="Digite sua senha" />
					<button data-testid='submit' disabled className={S.submit} type="submit">Entrar</button>
					<span className={S.link}>Criar conta</span>
					<FormStatus />
				</form>
			</Context.Provider>
			<Footer />
		</section>
  )
}

export default Login
