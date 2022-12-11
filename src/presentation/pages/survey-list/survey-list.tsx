import { Logo, Footer } from '@/presentation/components'
import React from 'react'
import S from './survey-list-styles.scss'

type SurveyListProps = {
	
}
 
const SurveyList: React.FC<SurveyListProps> = () => {
	return (
		<section className={S.surveyListWrap}>
			<header className={S.headerWrap}>
				<section className={S.headerContent}>
				<Logo />
				<section className={S.logoutWrap}>
					<span>Guilherme</span>
					<a href="#">Sair</a>
				</section>
				</section>
			</header>
			<section className={S.contentWrap}>
				<h2>Enquetes</h2>
				<ul>
				<li>
						<section className={S.surveyContent}>
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
