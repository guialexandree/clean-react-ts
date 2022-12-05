import { AddAccount } from '@/domain/usecases'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'

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
      case HttpStatusCode.ok: return null
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}
