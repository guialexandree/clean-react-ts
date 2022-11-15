import { AccountModel } from '@/domain/models'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { HttpPostClient } from '@/data/protocols'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    await this.httpClient.post({
      url: this.url,
      body: params
    })

    return null
  }
}
