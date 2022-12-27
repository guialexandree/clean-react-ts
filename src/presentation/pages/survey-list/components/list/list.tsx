import React from 'react'
import S from './list-styles.scss'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyItemEmpty, SurveyItem } from '@/presentation/pages/survey-list/components'

type Props = {
  surveys: LoadSurveyList.Model[]
}

const List: React.FC<Props> = ({ surveys }) => {
  return (
		<ul className={S.listWrap} data-testid='survey-list'>
			{surveys.length ?	surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />) :	<SurveyItemEmpty />}
		</ul>
  )
}

export default List
