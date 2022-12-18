import { HttpGetParams } from '@/data/protocols'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test/mocks'
import { mockAccountModel } from '@/domain/test/mocks'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import faker from 'faker'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpGetClientSpy)

  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  test('Should call GetStorage with correc value', async () => {
    const { sut, getStorageSpy } = makeSut()

    await sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add header if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    }
    await sut.get(httpRequest)

    expect(httpGetClientSpy.url).toBe(httpGetClientSpy.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('Should add header to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(httpRequest)

    expect(httpGetClientSpy.url).toBe(httpGetClientSpy.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should merge headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.random.words()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field
      }
    }
    await sut.get(httpRequest)

    expect(httpGetClientSpy.url).toBe(httpGetClientSpy.url)
    expect(httpGetClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })
})
