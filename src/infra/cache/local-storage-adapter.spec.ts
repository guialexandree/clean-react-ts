import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'
import faker from 'faker'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorage Adapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call SetLocalStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<{}>()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
