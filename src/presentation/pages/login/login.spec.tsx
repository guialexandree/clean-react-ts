import * as React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test'
import Login from './login'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
	validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)

  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

	test('Should show email erro if validation fails', () => {
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    
		expect(emailStatus.title).toBe(validationStub.errorMessage)
		expect(emailStatus.textContent).toBe('🔴')
  })

	test('Should show password erro if validation fails', () => {
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('password')
    fireEvent.input(emailInput, { target: { value: faker.internet.password() } })
    const emailStatus = sut.getByTestId('password-status')

		expect(emailStatus.title).toBe(validationStub.errorMessage)
		expect(emailStatus.textContent).toBe('🔴')
  })
})
