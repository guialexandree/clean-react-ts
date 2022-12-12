import React from 'react'
import S from './survey-item-empty-styles.scss'

const SurveyItemEmpty: React.FC = () => {
  return (
		<>
			<li className={S.surveyItemEmpty}></li>
			<li className={S.surveyItemEmpty}></li>
			<li className={S.surveyItemEmpty}></li>
			<li className={S.surveyItemEmpty}></li>
		</>
  )
}

export default SurveyItemEmpty
