import * as Helper from './http-mocks'
import faker from 'faker'

export const mockInvalidCredendialsError = (): void => Helper.mockInvalidCredendialsError('signin')
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError('signin', 'POST')
export const mockOk = (): void => Helper.mockOk('signin', 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
export const mockInvalidData = (): void => Helper.mockOk('signin', 'POST', { invalid: faker.datatype.uuid() })
