import React from 'react'
import S from './input-styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<InputProps> = (props) => {
  return (
		<section className={S.inputWrap}>
			<input {...props} />
			<span className={S.status}>🔴</span>
		</section>
  )
}

export default Input
