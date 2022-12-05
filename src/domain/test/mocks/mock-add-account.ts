import { AddAccount } from '@/domain/usecases'
import faker from 'faker'

export const mockAddAccount = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

// export const mockAccountModel = (): AddAccount.Result => ({
//   accessToken: faker.datatype.uuid()
// })
