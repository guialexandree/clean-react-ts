import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import S from './survey-list-styles.scss'
import React, { useEffect, useState } from 'react'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
	const [state, setState] = useState({
		surveys: [] as SurveyModel[],
		error: ''
	})
  useEffect(() => {
		loadSurveyList
	  	.loadAll()
			.then(surveys => setState({ ...state, surveys }))
			.catch(error => setState({ ...state, error: error.message }))
  }, [])

  return (
		<section className={S.surveyListWrap}>
			<Header />
			<section className={S.contentWrap}>
				<h2>Enquetes</h2>
				{state.error
					? <section>
						<span data-testid='error'>{state.error}</span>
						<button>Recarregar</button>
					</section>
					: <ul data-testid='survey-list'>
						{state.surveys.length
							? state.surveys.map(survey => <SurveyItem key={survey.id} survey={survey} />)
							: <SurveyItemEmpty />
						}
					</ul>
				}
			</section>
			<Footer />
		</section>
  )
}

export default SurveyList
