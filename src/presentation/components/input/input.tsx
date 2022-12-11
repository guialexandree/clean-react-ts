import React, { useContext, useRef } from 'react'
import S from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string
}

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  return (
    <div
			data-testid={`${props.name}-wrap`}
			className={S.inputWrap}
			data-status={error ? 'invalid' : 'valid' }
			>
      <input
				{...props}
				ref={inputRef}
				title={error}
				data-testid={props.name}
				onChange={handleChange}
				placeholder=" "
			/>
			<label
				data-testid={`${props.name}-label`}
				title={error}
				onClick={_ => inputRef.current.focus()}
			>
				{props.placeholder}
			</label>
    </div>
  )
}

export default Input
