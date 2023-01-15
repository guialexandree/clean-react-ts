import { AccountModel } from '@/domain/models'
import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'surveyResultState',
  default: {
    getCurrentAccount: null as () => AccountModel,
    setCurrentAccount: null as (account: AccountModel) => void
  }
})
