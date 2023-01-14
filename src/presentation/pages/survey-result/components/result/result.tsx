import React from 'react'
import { useHistory } from 'react-router-dom'
import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'
import S from './result-styles.scss'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }) => {
  const { goBack } = useHistory()

  return (
		<section style={{ position: 'relative' }}>
			<hgroup>
				<Calendar date={surveyResult.date} className={S.calendarWrap} />
				<h2 data-testid="question">{surveyResult.question}</h2>
			</hgroup>
			<ul data-testid="answers" className={S.answersList}>
				{surveyResult.answers.map(answer => <SurveyResultAnswer key={answer.answer} answer={answer} />)}
			</ul>
			<button className={S.button} data-testid="back-button" onClick={goBack}>Voltar</button>
		</section>
  )
}

export default Result
