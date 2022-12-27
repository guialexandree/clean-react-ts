import React from 'react'
import FlipMove from 'react-flip-move'
import S from './survey-result-styles.scss'
import { Header, Footer, Spinner } from '@/presentation/components'

const SurveyResult: React.FC = () => {
	return (
		<section className={S.surveyResultWrap}>
			<Header />
      <div className={S.contentWrap}>
        <h2>PERGUNTA DA ENQUETE?</h2>
				<FlipMove className={S.answersList}>
					<li>
						<img src="" alt="Imagem do item" />
						<span className={S.answer}>ReactJS</span>
						<span className={S.percent}>50%</span>
					</li>
					<li className={S.active}>
						<img src="" alt="Imagem do item" />
						<span className={S.answer}>ReactJS</span>
						<span className={S.percent}>50%</span>
					</li>
					<li>
						<img src="" alt="Imagem do item" />
						<span className={S.answer}>ReactJS</span>
						<span className={S.percent}>50%</span>
					</li>
				</FlipMove>
				<button>Voltar</button>
				<section className={S.loadingWrap}>
					<section className={S.loading}>
						<span>Aguarde...</span>
						<Spinner isNegative />
					</section>
				</section>
      </div>
      <Footer />
		</section>
	)
}
 
export default SurveyResult;