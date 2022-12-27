import React from 'react'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'
import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'
import S from './result-styles.scss'

type Props = {
	surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }) => {
	const { goBack } = useHistory()

	return (
		<>
			<hgroup>
				<Calendar date={surveyResult.date} className={S.calendarWrap} />
				<h2 data-testid="question">{surveyResult.question}</h2>
			</hgroup>
			<FlipMove data-testid="answers" className={S.answersList}>
				{surveyResult.answers.map(answer =>
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
			<button className={S.button} data-testid="back-button" onClick={goBack}>Voltar</button>
		</>
	)
}
 
export default Result
