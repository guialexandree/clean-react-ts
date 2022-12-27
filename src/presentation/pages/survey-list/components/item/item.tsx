import { LoadSurveyList } from '@/domain/usecases'
import { Calendar, Icon, IconName } from '@/presentation/components'
import S from './item-styles.scss'
import React from 'react'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown
  return (
		<li className={S.surveyItemWrap}>
			<section className={S.surveyContent}>
				<Icon iconName={iconName} className={S.iconWrap} />
				<Calendar date={survey.date} className={S.calendarWrap} />
				<p data-testid='question'>{survey.question}</p>
			</section>
			<footer>Ver resultado</footer>
		</li>
  )
}

export default SurveyItem
