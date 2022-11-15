import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mocks'
import faker from 'faker'

describe('RemoteAuthentication', () => {
  test('Should call httpCliente if correct url', async () => {
    const url = faker.internet.url()
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(
      url,
      httpPostClientSpy
    )

    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
