import S from './error-styles.scss'
import { SurveyContext } from '@/presentation/pages/survey-list/components'
import React, { useContext } from 'react'

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)

  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
		<section className={S.errorWrap}>
			<span data-testid='error'>{state.error}</span>
			<button data-testid='reload' onClick={reload}>Tentar novamente</button>
		</section>
  )
}

export default Error
