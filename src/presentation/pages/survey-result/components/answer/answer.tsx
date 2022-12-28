import React, { useContext } from 'react'
import { SurveyResultAnswerModel } from '@/domain/models'
import { SurveyResultContext } from '@/presentation/pages/survey-result/components'
import S from './answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useContext(SurveyResultContext)
  const answerClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    event.preventDefault()
    if (event.currentTarget.classList.contains(S.active)) {
      return
    }
    onAnswer(answer.answer)
  }

  const activeClassName = answer.isCurrentAccountAnswer ? S.active : ''
  return (
		<li
			key={answer.answer}
			className={[S.answerWrap, activeClassName].join(' ')}
			data-testid="answer-wrap"
			onClick={answerClick}
		>
			{answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
			<span data-testid="answer" className={S.answer}>{answer.answer}</span>
			<span data-testid="percent" className={S.percent}>{answer.percent}%</span>
		</li>
  )
}

export default Answer
