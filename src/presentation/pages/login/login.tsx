import React, { useContext, useEffect, useState } from 'react'
import S from './login-styles.scss'
import { Authentication } from '@/domain/usecases'
import { LoginHeader as Header, Footer, Input, FormStatus, SubmitButton } from '@/presentation/components'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols'
import { Link, useHistory } from 'react-router-dom'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<LoginProps> = ({
  validation,
  authentication
}: LoginProps) => {
  const { setCurrentAccount } = useContext(ApiContext)
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

  useEffect(() => validate('email'), [state.email])
	useEffect(() => validate('password'), [state.password])

	const validate = (fielName: string) => {
		const { email, password } = state
		const formData = { email, password }
		const error = validation.validate(fielName, formData)
		setState(old => ({ ...old, [`${fielName}Error`]: error }))
		setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
	}

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) { return }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      setCurrentAccount(account)
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
		<section className={S.loginWrap}>
			<Header />
			<FormContext.Provider value={{ state, setState }}>
				<form data-testid="form" className={S.form} onSubmit={handleSubmit}>
					<h2>Login</h2>
					<Input type="email" name="email" placeholder="Digite seu e-mail" />
					<Input type="password" name="password" placeholder="Digite sua senha" />
					<SubmitButton text="Entrar" />
					<Link data-testid="signup" to="/signup" className={S.link}>Criar conta</Link>
					<FormStatus />
				</form>
			</FormContext.Provider>
			<Footer />
		</section>
  )
}

export default Login
