import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import { SurveyContext, SurveyError, SurveyListItem } from '@/presentation/pages/survey-list/components'
import S from './survey-list-styles.scss'
import React, { useEffect, useState } from 'react'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
	const [state, setState] = useState({
		surveys: [] as SurveyModel[],
		error: '',
		reload: false
	})
  useEffect(() => {
		loadSurveyList
			.loadAll()
			.then(surveys => setState({ ...state, surveys }))
			.catch(error => setState({ ...state, error: error.message }))
  }, [state.reload])

  return (
		<section className={S.surveyListWrap}>
			<Header />
			<section className={S.contentWrap}>
				<h2>Enquetes</h2>
				<SurveyContext.Provider value={{ state, setState }}>
					{state.error ? <SurveyError /> : <SurveyListItem />}
				</SurveyContext.Provider>
			</section>
			<Footer />
		</section>
  )
}

export default SurveyList
