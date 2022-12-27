import React from 'react'
import FlipMove from 'react-flip-move'
import S from './survey-result-styles.scss'
import { Header, Footer, Loading, Calendar } from '@/presentation/components'

const SurveyResult: React.FC = () => {
  return (
		<section className={S.surveyResultWrap}>
			<Header />
      <div className={S.contentWrap}>
				{
					true && <>
						<hgroup>
							<Calendar date={ new Date()} className={S.calendarWrap} />
							<h2>PERGUNTA DA ENQUETE?</h2>
						</hgroup>
						<FlipMove className={S.answersList}>
							<li>
								<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="Imagem do item" />
								<span className={S.answer}>ReactJS</span>
								<span className={S.percent}>50%</span>
							</li>
							<li className={S.active}>
								<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="Imagem do item" />
								<span className={S.answer}>ReactJS</span>
								<span className={S.percent}>50%</span>
							</li>
							<li>
								<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="Imagem do item" />
								<span className={S.answer}>ReactJS</span>
								<span className={S.percent}>50%</span>
							</li>
						</FlipMove>
						<button>Voltar</button>
					</>
				}
				{ false && <Loading /> }
      </div>
      <Footer />
		</section>
  )
}

export default SurveyResult
