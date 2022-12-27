import React, { useEffect, useState } from 'react'
import S from './survey-result-styles.scss'
import { LoadSurveyResult } from '@/domain/usecases'
import { Header, Footer, Loading, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }))
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const reload = (): void =>  setState(old => ({ ...old, isLoading: false, error: '', reload: !old.reload }))

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
		<section className={S.surveyResultWrap}>
			<Header />
      <div data-testid="survey-result" className={S.contentWrap}>
				{ state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
				{ state.isLoading && <Loading /> }
				{ state.error && <Error error={state.error} reload={reload} /> }
      </div>
      <Footer />
		</section>
  )
}

export default SurveyResult
