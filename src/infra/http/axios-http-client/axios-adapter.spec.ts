import { AxiosAdapter } from '@/infra'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockPostRequest } from '@/data/test/mocks'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosAdapter
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const mockedAxios = mockAxios()
  const sut = new AxiosAdapter()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  describe('post()', () => {
    test('Should call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut()

      const request = mockPostRequest()
      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct response on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()

      const promise = sut.post(mockPostRequest())

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('Should return the correct error on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.post(mockPostRequest())

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
})
