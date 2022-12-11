import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { AccountModel } from '@/domain/models'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const httpReponse = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch (httpReponse.statusCode) {
      case HttpStatusCode.ok: return httpReponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}
