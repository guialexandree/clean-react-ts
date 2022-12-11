import { AccountModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'
import { SetStorage } from '@/data/protocols'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}

  async save (account: AccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError()
    }
    await this.setStorage.set('account', JSON.stringify(account))
  }
}