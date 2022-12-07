import React, { useContext } from 'react'
import S from './submit-button-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type InputProps = {
  text: string
}

const Input: React.FC<InputProps> = ({
  text
}) => {
  const { state } = useContext(Context)

  return (
		<button data-testid="submit" disabled={state.isFormInvalid} className={S.submit} type="submit">Entrar</button>
  )
}

export default Input
