import React, { useEffect, useState } from 'react'
import S from './signup-styles.scss'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols'
import { Link, useHistory } from 'react-router-dom'

type SignUpProps = {
  validation: Validation
  addAccount: AddAccount
	saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<SignUpProps> = ({
  validation,
  addAccount,
	saveAccessToken
}: SignUpProps) => {
	const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    mainError: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.passwordError),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordError)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault()
		try {
			if (state.isLoading || state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError) { return }
			setState({ ...state, isLoading: true })
			const account = await addAccount.add({
				name: state.name,
				email: state.email,
				password: state.password,
				passwordConfirmation: state.passwordConfirmation
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
		<section className={S.signup}>
			<Header />
			<Context.Provider value={{ state, setState }}>
				<form data-testid="form" className={S.form} onSubmit={handleSubmit} >
					<h2>Criar Conta</h2>
					<Input type="text" name="name" placeholder="Digite seu nome" />
					<Input type="email" name="email" placeholder="Digite seu e-mail" />
					<Input type="password" name="password" placeholder="Digite sua senha" />
					<Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
					<button disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError} className={S.submit} type="submit">Entrar</button>
					<Link data-testid="login-link" replace to="/login" className={S.link}>Voltar para Login</Link>
					<FormStatus />
				</form>
			</Context.Provider>
			<Footer />
		</section>
  )
}

export default SignUp
