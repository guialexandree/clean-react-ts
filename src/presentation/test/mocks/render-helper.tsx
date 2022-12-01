import { AccountModel } from '@/domain/models'
import { Router } from 'react-router-dom'
import { MemoryHistory } from 'history'
import { render } from '@testing-library/react'
import React from 'react'
import { mockAccountModel } from '@/domain/test/mocks'

type Params = {
  Page: React.FC
  history: MemoryHistory
  account?: AccountModel
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithHistory = ({ Page, history, account = mockAccountModel() }: Params): Result => {
  const setCurrentAccountMock = jest.fn()

  render(
		<Router history={history}>
			<Page />
		</Router>
  )
  return {
    setCurrentAccountMock
  }
}
