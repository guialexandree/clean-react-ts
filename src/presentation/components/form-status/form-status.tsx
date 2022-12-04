import React, { useContext } from 'react'
import S from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

type FormStatusProps = {}

const FormStatus: React.FC<FormStatusProps> = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state
  return (
		<section data-testid="error-wrap" className={S.errorWrap}>
			{ isLoading && <Spinner className={S.spinner} /> }
			{ mainError && <span data-testid="main-error" className={S.error}>{mainError}</span> }
		</section>
  )
}

export default FormStatus
