import React, { useContext, useRef } from 'react'
import S from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string
  placeholder: string
}

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  return (
    <div className={S.inputWrap}>
      <input
				{...props}
				ref={inputRef}
				data-testid={props.name}
				onChange={handleChange}
				placeholder=" "
			/>
			<label
				onClick={_ => inputRef.current.focus()}
			>{props.placeholder}</label>
      <span
				data-testid={`${props.name}-status`}
				title={error || 'Tudo certo!'}
				className={S.status}
			>
				{error ? '🔴' : '🟢'}
			</span>
    </div>
  )
}

export default Input
