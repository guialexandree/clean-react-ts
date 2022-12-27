import React from 'react'
import { useParams } from 'react-router-dom'
import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases'

type Params = {
	id: string
}

export const makeSurveyResult: React.FC = () => {
	const { id } = useParams<Params>()
  return (
		<SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />
  )
}
