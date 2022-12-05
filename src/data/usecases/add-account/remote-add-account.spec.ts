import { AddAccount } from '@/domain/usecases'
import { HttpPostClientSpy } from '@/data/test/mocks'
import { mockAddAccount } from '@/domain/test/mocks'
import { RemoteAddAccount } from './remote-add-account'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Params, AddAccount.Result>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccount.Params, AddAccount.Result>()
  const sut = new RemoteAddAccount(
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

    await sut.add(mockAddAccount())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call httpCliente if correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParams = mockAddAccount()

    await sut.add(addAccountParams)

    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })
})
