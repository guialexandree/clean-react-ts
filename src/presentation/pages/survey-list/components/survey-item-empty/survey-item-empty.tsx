import React from 'react'
import S from './survey-item-empty-styles.scss'

const SurveyItemEmpty: React.FC = () => {
  return (
		<section data-testid='survey-list'>
			<li className={S.surveyItemEmpty}></li>
			<li className={S.surveyItemEmpty}></li>
			<li className={S.surveyItemEmpty}></li>
			<li className={S.surveyItemEmpty}></li>
		</section>
  )
}

export default SurveyItemEmpty
