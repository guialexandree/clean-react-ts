import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'

describe('RemoteAuthentication', () => {
  test('Should call httpCliente if correct url', async () => {
    class HttpPostClientSpy {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
        return await Promise.resolve()
      }
    }
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
