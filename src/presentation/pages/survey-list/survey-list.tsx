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
				<li>
					<section className={S.surveyContent}>
						<Icon
							iconName={IconName.thumbDown}
							className={[S.iconWrap, S.green].join(' ')
							}
						/>
						<time>
							<span className={S.day}>11</span>
							<span className={S.month}>12</span>
							<span className={S.year}>2022</span>
						</time>
						<p>Qual o seu framework de web favorito?</p>
					</section>
					<footer>Ver resultado</footer>
				</li>
				<li>
					<section className={S.surveyContent}>
						<Icon
							iconName={IconName.thumbDown}
							className={[S.iconWrap, S.green].join(' ')
							}
						/>
						<time>
							<span className={S.day}>11</span>
							<span className={S.month}>12</span>
							<span className={S.year}>2022</span>
						</time>
						<p>Qual o seu framework de web favorito?</p>
					</section>
					<footer>Ver resultado</footer>
				</li>
				<li>
					<section className={S.surveyContent}>
						<Icon
							iconName={IconName.thumbDown}
							className={[S.iconWrap, S.green].join(' ')
							}
						/>
						<time>
							<span className={S.day}>11</span>
							<span className={S.month}>12</span>
							<span className={S.year}>2022</span>
						</time>
						<p>Qual o seu framework de web favorito?</p>
					</section>
					<footer>Ver resultado</footer>
				</li>
				</ul>
			</section>
			<Footer />
		</section>
  )
}

export default SurveyList
