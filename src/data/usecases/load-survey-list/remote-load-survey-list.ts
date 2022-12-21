import { UnexpectedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/usecases'
import { HttpGetClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    const httpReponse = await this.httGetClient.get({ url: this.url })
    const remoteSurveys = httpReponse.body || []

    switch (httpReponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys.map(remoteSurvey => Object.assign(remoteSurvey, {
          date: new Date(remoteSurvey.date)
        }))
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string
    question: string
    date: string
    didAnswer: boolean
  }
}
