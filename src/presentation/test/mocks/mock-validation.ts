import { Validation } from '@/presentation/protocols'

export class ValidationStub implements Validation {
  errorMessage: string

  validate (): string {
    return this.errorMessage
  }
}
