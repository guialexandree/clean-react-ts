import React from 'react'
import S from './signup-styles.scss'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols'
import { Link } from 'react-router-dom'

type SignUpProps = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<SignUpProps> = ({
  validation,
  authentication,
  saveAccessToken
}: SignUpProps) => {
  return (
		<section className={S.signup}>
			<Header />
			<Context.Provider value={{ state: {} }}>
				<form className={S.form}>
					<h2>Criar Conta</h2>
					<Input type="text" name="name" placeholder="Digite seu nome" />
					<Input type="email" name="email" placeholder="Digite seu e-mail" />
					<Input type="password" name="password" placeholder="Digite sua senha" />
					<Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
					<button className={S.submit} type="submit">Entrar</button>
					<Link to="/login" className={S.link}>Voltar para Login</Link>
					<FormStatus />
				</form>
			</Context.Provider>
			<Footer />
		</section>
  )
}

export default SignUp
