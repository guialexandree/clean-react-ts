import React from 'react'
import S from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import Header from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'

interface Props {
	
}
 
const Login : React.FC<Props> = () => {
	return (
		<section className={S.login}>
			<Header />
			<form className={S.form} action="">
				<h2>Login</h2> 
				<Input type="email" name="email" placeholder="Digite seu e-mail" />
				<Input type="password" name="password" placeholder="Digite sua senha" />
				<button className={S.submit} type="submit">Entrar</button>
				<span className={S.link}>Criar conta</span>
				<section className={S.errorWrap}>
					<Spinner className={S.spinner} />
					<span className={S.error}>Erro</span>
				</section>
			</form>
			<Footer />
		</section>
	)
}
 
export default Login
