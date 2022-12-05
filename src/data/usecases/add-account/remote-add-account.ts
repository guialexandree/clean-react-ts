import { AddAccount } from '@/domain/usecases'
import { HttpPostClient } from '@/data/protocols'

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
    return null
  }
}
