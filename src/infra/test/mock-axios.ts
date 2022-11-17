import axios from 'axios'
import faker from 'faker'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const mockedAxiosResult = {
    data: faker.random.objectElement(),
    status: faker.datatype.number()
  }
  mockedAxios.post.mockReturnValue(Promise.resolve(mockedAxiosResult))
  return mockedAxios
}
