
import { HttpGetClient, HttpResponse, HttpGetParams, GetStorage } from '@/data/protocols'

export class AuthorizeHttpClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('account')
    return null
  }
}
