import { Logo, Footer, Icon, Header } from '@/presentation/components'
import { IconName } from '@/presentation/components/icon/icon'
import React from 'react'
import S from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
		<section className={S.surveyListWrap}>
			<Header />
			<section className={S.contentWrap}>
				<h2>Enquetes</h2>
				<ul>
				</ul>
			</section>
			<Footer />
		</section>
  )
}

export default SurveyList
