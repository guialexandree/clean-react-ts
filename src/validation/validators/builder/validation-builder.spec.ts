import { EmailValidation } from '../email/email-validation'
import { MinLengthValidation } from '../min-length/min-length-validation'
import { RequiredFieldValidation } from '../required-field/required-field-validation'
import { ValidationBuilder as sut } from './validation-builder'
import faker from 'faker'

let fieldName: string

describe('ValidationBuilder', () => {
  beforeEach(() => {
    fieldName = faker.random.word()
  })

  test('Should return RequiredFieldValidation', () => {
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })

  test('Should return EmailValidation', () => {
    const validations = sut.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })

  test('Should return MinLengthValidation', () => {
    const validations = sut.field(fieldName).min(5).build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, 5)])
  })
})
