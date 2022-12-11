import { HttpGetClient } from '@/data/protocols'

export class RemoteLoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httGetClient: HttpGetClient
  ) {}

  async loadAll (): Promise<void> {
    await this.httGetClient.get({ url: this.url })
  }
}
