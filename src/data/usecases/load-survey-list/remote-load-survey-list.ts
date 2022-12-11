import { HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httGetClient: HttpGetClient
  ) {}

  async loadAll (): Promise<void> {
    const httpReponse = await this.httGetClient.get({ url: this.url })
    switch (httpReponse.statusCode) {
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
  }
}
