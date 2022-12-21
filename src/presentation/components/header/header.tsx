import { Logo } from '@/presentation/components'
import S from './header-styles.scss'
import { ApiContext } from '@/presentation/contexts'
import { useHistory } from 'react-router-dom'
import React, { memo, useContext } from 'react'

const Header: React.FC = () => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
		<header className={S.headerWrap}>
				<section className={S.headerContent}>
				<Logo />
				<section className={S.logoutWrap}>
					<span>Guilherme</span>
					<a data-testid="logout" href="#" onClick={logout}>Sair</a>
				</section>
				</section>
		</header>
  )
}

export default memo(Header)
