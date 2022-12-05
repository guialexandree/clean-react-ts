import React, { useState } from 'react'
import S from './signup-styles.scss'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols'

type SignUpProps = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<SignUpProps> = () => {
	const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    nameError: 'Campo Obrigatório',
    emailError: 'Campo Obrigatório',
    passwordError: 'Campo Obrigatório',
    passwordConfirmationError: 'Campo Obrigatório'
  })

  return (
		<section className={S.signup}>
			<Header />
			<Context.Provider value={{ state }}>
				<form className={S.form}>
					<h2>Criar Conta</h2>
					<Input type="text" name="name" placeholder="Digite seu nome" />
					<Input type="email" name="email" placeholder="Digite seu e-mail" />
					<Input type="password" name="password" placeholder="Digite sua senha" />
					<Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
					<button className={S.submit} type="submit">Entrar</button>
					<span className={S.link}>Voltar para Login</span>
					<FormStatus />
				</form>
			</Context.Provider>
			<Footer />
		</section>
  )
}

export default SignUp
