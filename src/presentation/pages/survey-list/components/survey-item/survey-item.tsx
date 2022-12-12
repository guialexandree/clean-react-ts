import React from 'react'
import S from './survey-item-styles.scss'
import { Icon, IconName } from '@/presentation/components'

const SurveyItem: React.FC = () => {
  return (
		<li className={S.surveyItemWrap}>
			<section className={S.surveyContent}>
				<Icon iconName={IconName.thumbDown} className={S.iconWrap} />
				<time>
					<span className={S.day}>11</span>
					<span className={S.month}>12</span>
					<span className={S.year}>2022</span>
				</time>
				<p>Qual o seu framework de web favorito?</p>
			</section>
			<footer>Ver resultado</footer>
		</li>
  )
}

export default SurveyItem
