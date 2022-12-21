import * as Http from './http-mocks'
import faker from 'faker'

export const mockInvalidCredendialsError = (): void => Http.mockUnauthorizedError('signin')
export const mockUnexpectedError = (): void => Http.mockServerError('signin', 'POST')
export const mockOk = (): void => Http.mockOk('signin', 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
