import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyContext, SurveyError, SurveyListItem } from '@/presentation/pages/survey-list/components'
import S from './survey-list-styles.scss'
import React, { useEffect, useState } from 'react'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
	const handlerError = useErrorHandler((error: Error) => {
		setState({ ...state, error: error.message })
	})
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(handlerError)
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
