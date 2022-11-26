import * as React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
import faker from 'faker'
import { Validation } from '@/presentation/protocols/validation'

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo Obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo Obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.input).toEqual({
      email
    })
  })

	test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.input).toEqual({
      password
    })
  })
})
