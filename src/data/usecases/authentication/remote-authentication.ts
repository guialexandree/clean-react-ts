import { AccountModel } from '@/domain/models'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpReponse = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch (httpReponse.statusCode) {
      case HttpStatusCode.ok: return httpReponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
