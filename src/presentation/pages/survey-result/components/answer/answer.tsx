import { SurveyResultAnswerModel } from '@/domain/models'
import React from 'react'
import S from './answer-styles.scss'

type Props = {
	answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? S.active : ''
  return (
		<li
			key={answer.answer}
			className={[S.answerWrap, activeClassName].join(' ')}
			data-testid="answer-wrap"
		>
			{answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
			<span data-testid="answer" className={S.answer}>{answer.answer}</span>
			<span data-testid="percent" className={S.percent}>{answer.percent}%</span>
		</li>
  )
}

export default Answer
