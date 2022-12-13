import React, { useContext } from 'react'
import { SurveyItemEmpty, SurveyItem, SurveyContext } from '@/presentation/pages/survey-list/components'
import S from 'survey-styles.scss' 
import { SurveyModel } from '@/domain/models'

const List: React.FC = () => {
const { state }= useContext(SurveyContext)
	return (
		<ul className={S.listWrap} data-testid='survey-list'>
			{state.surveys.length ?	state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />) :	<SurveyItemEmpty />}
		</ul>
	)
}
 
export default List
