import { LoadSurveyList } from '@/domain/usecases'
import { AccessDeniedError } from '@/domain/errors'
import { Footer, Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { SurveyContext, SurveyError, SurveyListItem } from '@/presentation/pages/survey-list/components'
import S from './survey-list-styles.scss'
import { useHistory } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          history.replace('/login')
        } else {
          setState({ ...state, error: error.message })
        }
      })
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
