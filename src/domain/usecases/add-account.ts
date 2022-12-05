import { AccountModel } from '@/domain/models'

export interface AddAccount {
  add: (params: AddAccount.Params) => AddAccount.Result
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
  export type Result = Promise<AccountModel>
}
