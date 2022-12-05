import { AddAccount } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { EmailInUseError } from '@/domain/errors'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AddAccount.Params, AddAccount.Result>
  ) {}

  async add (params: AddAccount.Params): AddAccount.Result {
    const httpReponse = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch (httpReponse.statusCode) {
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: return null
    }
  }
}
