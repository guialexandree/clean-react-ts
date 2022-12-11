import React, { memo } from 'react'
import { Logo } from '@/presentation/components'
import S from './header-styles.scss'

type HeaderProps = { }

const Header: React.FC<HeaderProps> = () => {
  return (
		<header className={S.headerWrap}>
				<section className={S.headerContent}>
				<Logo />
				<section className={S.logoutWrap}>
					<span>Guilherme</span>
					<a href="#">Sair</a>
				</section>
				</section>
		</header>
  )
}

export default memo(Header)
