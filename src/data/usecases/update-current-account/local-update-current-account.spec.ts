import { LocalUpdateCurrentAccount } from '@/data/usecases'
import { SetStorageMock } from '@/data/test/mocks'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test/mocks'
import faker from 'faker'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalUpdateCurrentAccount', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const account = mockAccountModel()

    await sut.save(account)

    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()

    const promise = sut.save(undefined)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
