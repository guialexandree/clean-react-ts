import axios from 'axios'
import faker from 'faker'

export const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockClear().mockReturnValue(Promise.resolve(mockHttpResponse()))
  mockedAxios.get.mockClear().mockReturnValue(Promise.resolve(mockHttpResponse()))
  return mockedAxios
}
