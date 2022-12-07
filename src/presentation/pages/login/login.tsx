import React, { useEffect, useState } from 'react'
import S from './login-styles.scss'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { LoginHeader as Header, Footer, Input, FormStatus, SubmitButton } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols'
import { Link, useHistory } from 'react-router-dom'

type LoginProps = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<LoginProps> = ({
  validation,
  authentication,
  saveAccessToken
}: LoginProps) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: false,
    mainError: '',
    emailError: '',
    passwordError: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) { return }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
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
					<SubmitButton text="Entrar" />
					<Link data-testid="signup" to="/signup" className={S.link}>Criar conta</Link>
					<FormStatus />
				</form>
			</Context.Provider>
			<Footer />
		</section>
  )
}

export default Login
