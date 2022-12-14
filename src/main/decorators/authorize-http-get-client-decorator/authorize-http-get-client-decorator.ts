
import { HttpGetClient, HttpResponse, HttpGetParams, GetStorage } from '@/data/protocols'

export class AuthorizeHttpClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          'x-access-token': account.accessToken
        })
      })
    }
    const httpResponse = await this.httpGetClient.get(params)
    return httpResponse
  }
}
