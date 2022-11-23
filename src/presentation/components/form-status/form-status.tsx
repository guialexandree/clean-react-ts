import React from 'react'
import Spinner from '../spinner/spinner'
import S from './form-status-styles.scss'

type FormStatusProps = {}

const FormStatus: React.FC<FormStatusProps> = () => {
  return (
		<section className={S.errorWrap}>
			<Spinner className={S.spinner} />
			<span className={S.error}>Erro</span>
		</section>
  )
}

export default FormStatus
