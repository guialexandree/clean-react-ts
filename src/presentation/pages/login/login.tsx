import React, { useEffect, useState } from 'react'
import S from './login-styles.scss'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<LoginProps> = ({
  validation,
  authentication
}: LoginProps) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    emailError: '',
    passwordError: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) { return }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
		<section className={S.login}>
			<Header />
			<Context.Provider value={{ state, setState }}>
				<form data-testid="form" className={S.form} onSubmit={handleSubmit}>
					<h2>Login</h2>
					<Input type="email" name="email" placeholder="Digite seu e-mail" />
					<Input type="password" name="password" placeholder="Digite sua senha" />
					<button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={S.submit} type="submit">Entrar</button>
					<Link data-testid="register" to="/signup" className={S.link}>Criar conta</Link>
					<FormStatus />
				</form>
			</Context.Provider>
			<Footer />
		</section>
  )
}

export default Login
