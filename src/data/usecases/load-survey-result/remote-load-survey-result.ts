import { LoadSurveyResult } from '@/domain/usecases'
import { HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load (): Promise<LoadSurveyResult.Model> {
    const httpReponse = await this.httGetClient.get({ url: this.url })
    const remoteSurveyResult = httpReponse.body

    switch (httpReponse.statusCode) {
      case HttpStatusCode.ok: return Object.assign({}, remoteSurveyResult, {
        date: new Date(remoteSurveyResult.date)
      })
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string
    date: string
    answers: Array<{
      image?: string
      answer: string
      count: number
      percent: number
    }>
  }
}
