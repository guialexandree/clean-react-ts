import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import S from './survey-result-styles.scss'
import { LoadSurveyResult } from '@/domain/usecases'
import { Header, Footer, Loading, Calendar, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { useHistory } from 'react-router-dom'

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

  const reload = (): void => {
    setState(old => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }))
  }

	const { goBack } = useHistory()

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
		<section className={S.surveyResultWrap}>
			<Header />
      <div data-testid="survey-result" className={S.contentWrap}>
				{
					state.surveyResult && <>
						<hgroup>
							<Calendar date={state.surveyResult.date} className={S.calendarWrap} />
							<h2 data-testid="question">{state.surveyResult.question}</h2>
						</hgroup>
						<FlipMove data-testid="answers" className={S.answersList}>
							{state.surveyResult.answers.map(answer =>
								<li
									key={answer.answer}
									className={answer.isCurrentAccountAnswer ? S.active : ''}
									data-testid="answer-wrap"
								>
									{answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
									<span data-testid="answer" className={S.answer}>{answer.answer}</span>
									<span data-testid="percent" className={S.percent}>{answer.percent}%</span>
								</li>
							)}
						</FlipMove>
						<button data-testid="back-button" onClick={goBack}>Voltar</button>
					</>
				}
				{ state.isLoading && <Loading /> }
				{ state.error && <Error error={state.error} reload={reload} /> }
      </div>
      <Footer />
		</section>
  )
}

export default SurveyResult
