import React, { useEffect } from 'react'
import S from './survey-result-styles.scss'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Header, Footer, Loading, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData, surveyResultState, onSurveyAnswerState } from '@/presentation/pages/survey-result/components'
import { useRecoilState, useSetRecoilState } from 'recoil'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }))
  })
  const [state, setState] = useRecoilState(surveyResultState)

  const reload = (): void => { setState(old => ({ ...old, error: '', reload: !old.reload })) }
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)
  const onAnswer = (answer: string): void => {
    if (!state.isLoading) {
      setState(old => ({ ...old, isLoading: true }))
      saveSurveyResult.save({ answer })
        .then(surveyResult => { setState(old => ({ ...old, isLoading: false, surveyResult })) })
        .catch(handleError)
    }
  }

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => { setState(old => ({ ...old, surveyResult })) })
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
