import { Validation } from '@/presentation/protocols'
import { FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: FieldValidation[]) {}

  validate (fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(v => v.field === fieldName)
    for (const validation of validators) {
      const error = validation.validate(fieldValue)
      if (error) {
        return error.message
      }
    }

    return null
  }
}
