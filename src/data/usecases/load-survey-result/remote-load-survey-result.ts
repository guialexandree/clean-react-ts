import { HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httGetClient: HttpGetClient
  ) {}

  async load (): Promise<void> {
    const httpReponse = await this.httGetClient.get({ url: this.url })

    switch (httpReponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
