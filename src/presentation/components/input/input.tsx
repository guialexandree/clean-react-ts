import React, { useContext } from 'react'
import S from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<InputProps> = (props) => {
	const value = useContext(Context)
	const error = value[`${props.name}Error`]

	const getStatus = (): string => {
		return '🔴'
	}

	const getTitle = (): string => {
		return error
	}

  return (
		<section className={S.inputWrap}>
			<input {...props} />
			<span data-testid={`${props.name}-status`} title={getTitle()} className={S.status}>{getStatus()}</span>
		</section>
  )
}

export default Input
