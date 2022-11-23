import React from 'react'
import S from './login-styles.scss'
import { LoginHeader as Header, Footer, Input, FormStatus } from '@/presentation/components'

type LoginProps = { }

const Login: React.FC<LoginProps> = () => {
  return (
		<section className={S.login}>
			<Header />
			<form className={S.form} action="">
				<h2>Login</h2>
				<Input type="email" name="email" placeholder="Digite seu e-mail" />
				<Input type="password" name="password" placeholder="Digite sua senha" />
				<button className={S.submit} type="submit">Entrar</button>
				<span className={S.link}>Criar conta</span>
				<FormStatus />
			</form>
			<Footer />
		</section>
  )
}

export default Login
