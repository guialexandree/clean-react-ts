import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test/mocks'
import { UnexpectedError } from '@/domain/errors'
import { HttpGetClientSpy } from '@/data/test/mocks'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpStatusCode } from '@/data/protocols'
import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyList ', () => {
  test('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('Should throw UnexpectedError if HttpPostClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a list of SurveyModel if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockSurveyListModel()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const surveyList = await sut.loadAll()

    await expect(surveyList).toEqual(httpResult)
  })
})
