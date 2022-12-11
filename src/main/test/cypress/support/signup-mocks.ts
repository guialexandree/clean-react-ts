import * as Helper from './http-mocks'
import faker from 'faker'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError('signup')
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError('signup', 'POST')
export const mockInvalidCredendialsError = (): void => Helper.mockInvalidCredendialsError('signup')
export const mockOk = (): void => Helper.mockOk('signup', 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
