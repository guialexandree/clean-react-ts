import { LoadSurveyList } from '@/domain/usecases'
import { Icon, IconName } from '@/presentation/components'
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
				<time>
					<span data-testid='day' className={S.day}>
						{survey.date.getDate().toString().padStart(2, '0')}
						</span>
					<span data-testid='month' className={S.month}>
					{survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
					</span>
					<span data-testid='year' className={S.year}>
						{survey.date.getFullYear()}
						</span>
				</time>
				<p data-testid='question'>{survey.question}</p>
			</section>
			<footer>Ver resultado</footer>
		</li>
  )
}

export default SurveyItem
