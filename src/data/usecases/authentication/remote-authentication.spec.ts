import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mocks'
import { mockAuthentication } from '@/domain/test/mocks/mock-authentication'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(
    url,
    httpPostClientSpy
  )

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call httpCliente if correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call httpCliente if correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpRequest = mockAuthentication()
    await sut.auth(httpRequest)

    expect(httpPostClientSpy.body).toEqual(httpRequest)
  })

  test('Should throw InvalidCredentialErro if httoPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
