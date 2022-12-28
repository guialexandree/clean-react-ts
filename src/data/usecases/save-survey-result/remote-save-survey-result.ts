import { SaveSurveyResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { RemoteSurveyResultModel } from '@/data/models'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httClient.request({
      url: this.url,
      method: 'put',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      case HttpStatusCode.notFound: throw new UnexpectedError()
      default: return null
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
