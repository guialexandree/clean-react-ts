import React, { useContext } from 'react'
import S from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
}

const Input: React.FC<InputProps> = (props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return error || 'Ok'
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
		<section className={S.inputWrap}>
			<input data-testid={`${props.name}`} onChange={handleChange} {...props} />
			<span data-testid={`${props.name}-status`} title={getTitle()} className={S.status}>{getStatus()}</span>
		</section>
  )
}

export default Input
