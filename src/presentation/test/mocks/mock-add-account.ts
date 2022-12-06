import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams, Authentication, AuthenticationParams } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test/mocks'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AuthenticationParams
  callsCount = 0

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
