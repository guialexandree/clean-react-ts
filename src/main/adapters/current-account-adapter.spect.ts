import { mockAccountModel } from '@/domain/test/mocks'
import { setCurrentAccountAdapter as sut } from '@/main/adapters'
import { LocalStorageAdapter } from '@/infra/cache'
import { UnexpectedError } from '@/domain/errors'

jest.mock('@/infra//current-account-adapter')

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    sut(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('Should throws UnexpectedErro ', () => {
    expect(() => {
      sut(undefined)
    }).toThrow(new UnexpectedError())
  })
})
