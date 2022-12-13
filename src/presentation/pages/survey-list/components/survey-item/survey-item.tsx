import { SurveyModel } from '@/domain/models'
import { Icon, IconName } from '@/presentation/components'
import S from './survey-item-styles.scss'
import React from 'react'

type Props = {
	survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
		<li className={S.surveyItemWrap}>
			<section className={S.surveyContent}>
				<Icon iconName={IconName.thumbUp} className={S.iconWrap} />
				<time>
					<span data-testid='day' className={S.day}>
						{survey.date.getDate()}
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
