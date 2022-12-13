import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import S from './survey-list-styles.scss'
import React, { useEffect } from 'react'

type Props = {
	loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
	useEffect(() => {
		(async () => {
			loadSurveyList.loadAll()
		})()
	}, [])
  return (
		<section className={S.surveyListWrap}>
			<Header />
			<section className={S.contentWrap}>
				<h2>Enquetes</h2>
				<ul>
					<SurveyItemEmpty />
				</ul>
			</section>
			<Footer />
		</section>
  )
}

export default SurveyList
