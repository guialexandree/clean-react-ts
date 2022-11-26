import React, { useEffect, useState } from 'react'
import S from './login-styles.scss'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type LoginProps ={
	validation: Validation
}

const Login: React.FC<LoginProps> = ({
	validation
}: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
		emailError: 'Campo Obrigatório',
		passwordError: 'Campo Obrigatório',
		email: ''
  })

	useEffect(() => {
		validation.validate({ email: state.email})
	}, [state.email])
	
  return (
		<section className={S.login}>
			<Header />
			<Context.Provider value={{ state, setState }}>
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
