import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import S from './survey-result-styles.scss'
import { Header, Footer, Loading, Calendar, Error } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({...old, surveyResult })))
      .catch()
  }, [])

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
						<button>Voltar</button>
					</>
				}
				{ state.isLoading && <Loading /> }
				{ state.error && <Error error={state.error} reload={() => {}} /> }
      </div>
      <Footer />
		</section>
  )
}

export default SurveyResult