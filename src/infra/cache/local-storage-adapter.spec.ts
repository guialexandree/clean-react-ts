import { LocaStorageAdapter } from '@/infra/cache'
import 'jest-localstorage-mock'
import faker from 'faker'

const makeSut = (): LocaStorageAdapter => {
  return new LocaStorageAdapter()
}

describe('LocalStorage Adapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.words()

    await sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
