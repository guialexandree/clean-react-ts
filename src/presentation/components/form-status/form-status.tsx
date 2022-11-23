import React, { useContext } from 'react'
import Spinner from '../spinner/spinner'
import S from './form-status-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type FormStatusProps = {}

const FormStatus: React.FC<FormStatusProps> = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
		<section data-testid='error-wrap' className={S.errorWrap}>
			{ isLoading && <Spinner className={S.spinner} /> }
			{ errorMessage && <span className={S.error}>Erro</span> }
		</section>
  )
}

export default FormStatus
