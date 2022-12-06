import React, { useEffect, useState } from 'react'
import S from './signup-styles.scss'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols'

type SignUpProps = {
  validation: Validation
}

const SignUp: React.FC<SignUpProps> = ({
  validation
}: SignUpProps) => {
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
    setState({...state, isLoading: true})
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
					<button disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !! state.passwordConfirmationError} className={S.submit} type="submit">Entrar</button>
					<span className={S.link}>Voltar para Login</span>
					<FormStatus />
				</form>
			</Context.Provider>
			<Footer />
		</section>
  )
}

export default SignUp
