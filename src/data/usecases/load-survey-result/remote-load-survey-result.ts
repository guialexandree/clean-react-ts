import { HttpGetClient } from '@/data/protocols'

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httGetClient: HttpGetClient
  ) {}

  async load (): Promise<void> {
    const httpReponse = await this.httGetClient.get({ url: this.url })
  }
}
