import { GetStorageSpy, mockGetRequest } from '@/data/test/mocks'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy)

  return {
    sut,
    getStorageSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  test('Should call GetStorage with correc value', () => {
    const { sut, getStorageSpy } = makeSut()

    sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add header ig getStorage is invalid', () => {
    const { sut, getStorageSpy } = makeSut()
    getStorageSpy.value = null
    sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('account')
  })
})
